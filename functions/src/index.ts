import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

import { Expense } from './model/expense';
import { Relation } from './model/relation';

admin.initializeApp(functions.config().firebase);

const db: FirebaseFirestore.Firestore = admin.firestore();

const recalculateRelations = async function (userId: string) {

    const newRelations: Relation[] = [];

    const getOrCreateRelation = function (relationUserId) {
        let relation = newRelations.find(r => r.userId === relationUserId)
        if (!relation) {
            relation = {
                userId: relationUserId,
                owesMe: 0,
                iOwe: 0,
                expenses: []
            } as Relation
            newRelations.push(relation);
        }
        return relation
    }

    // delete relations
    const oldRelations = Promise.all((await db.collection(`users/${userId}/relations`).get())
        .docs.map(doc => db.doc(`users/${userId}/relations/${doc.id}`).delete()))

    // calculate new relations
    // get own expenses
    const expenses = (await db.collection(`users/${userId}/expenses`).get())
        .docs.map(doc => {
            const expense = doc.data() as Expense
            expense.id = doc.id
            return expense
        })

    // get other expenses
    const otherExpenses = (await db.collection(`users/${userId}/otherExpenses`).get())
        .docs.map(doc => {
            const expense = doc.data() as Expense
            expense.id = doc.id
            return expense
        })


    expenses.map(e =>
        e.users.filter(eu => eu.id !== e.creator)
            .map(eu => {
                const relation = getOrCreateRelation(eu.id)
                relation.owesMe = relation.owesMe + eu.individualAmount;
                relation.expenses.push(e.id)
            })
    )

    otherExpenses.map(e => {
        const expenseUser = e.users.find(eu => eu.id === userId)
        const relation = getOrCreateRelation(e.creator)
        relation.iOwe = relation.iOwe + expenseUser.individualAmount;
        relation.expenses.push(e.id)
    })

    return oldRelations.then(_ =>
        Promise.all(
            newRelations.map(rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel))
        )
    )

}

const replicateExpense = async function (event) {

    const userId = event.params.userId
    const expenseId = event.params.expenseId

    const expense = (await db.doc(`users/${userId}/expenses/${expenseId}`).get()).data() as Expense
    const debtors = expense.users.filter(u => u.id !== userId)

    return Promise.all(debtors.map(d => db.doc(`users/${d.id}/otherExpenses/${expenseId}`).set(expense)))

}

const removeExpenseFromDeletedUsers = function (event: functions.Event<functions.firestore.DeltaDocumentSnapshot>) {

    const userId = event.params.userId
    const expenseId = event.params.expenseId
    const prevExpense = event.data.previous.data() as Expense
    const newExpense = event.data.data() as Expense

    // get the removed users filtering the old that are not in the new
    const removedUsers = prevExpense.users.filter(pu => !newExpense.users.find(nu => nu.id === pu.id))

    return Promise.all(removedUsers.map(ru => db.doc(`users/${ru.id}/otherExpenses/${expenseId}`).delete()))

}

const deleteExpense = async function (event: functions.Event<functions.firestore.DeltaDocumentSnapshot>) {

    const userId = event.params.userId
    const expenseId = event.params.expenseId

    const deletedExpense = event.data.previous.data() as Expense
    const debtors = deletedExpense.users.filter(u => u.id !== userId)

    return Promise.all(debtors.map(d => db.doc(`users/${d.id}/otherExpenses/${expenseId}`).delete()))
}



//------------------------------------------------------------------------------------------------------------------//
//  EXPENSES REPLICATION
//------------------------------------------------------------------------------------------------------------------//
//ON CREATE EXPENSE -> update expense in all the other users
exports.createExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onCreate(event => replicateExpense(event))

//ON UPDATE EXPENSE -> update expense in all the other users
exports.updateExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onUpdate(event => Promise.all([replicateExpense(event),
    removeExpenseFromDeletedUsers(event)]))

//ON DELETE EXPENSE -> update expense in all the other users
exports.deleteExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onDelete(event => deleteExpense(event))


//------------------------------------------------------------------------------------------------------------------//
//  RELATIONS RECALCULATION
//------------------------------------------------------------------------------------------------------------------//
exports.onWriteOwnExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onWrite(event => recalculateRelations(event.params.userId))

exports.onWriteOtherExpense = functions.firestore.document('users/{userId}/otherExpenses/{expenseId}')
    .onWrite(event => recalculateRelations(event.params.userId))
