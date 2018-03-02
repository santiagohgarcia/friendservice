import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

import { Expense } from './model/expense';
import { Relation } from './model/relation';
import { ExpenseUser } from './model/expense-user';

admin.initializeApp(functions.config().firebase);

const db: FirebaseFirestore.Firestore = admin.firestore();

const recalculateRelations = function (userId: string) {

    // Delete old relations
    const relations = db.collection(`users/${userId}/relations`).get();

    return relations
        // Delete old relations
        .then(query => query.docs.map(q => q.ref.delete()))
        //Add new relations
        .then(async _ => {

            // get own expenses
            const expenses = await db.collection(`users/${userId}/expenses`).get()
                .then(query => query.docs.map(doc => doc.ref))
                .catch(err => {
                    console.log(err);
                    return null
                })

            // get other expenses
            const otherExpenses = await db.collection(`users/${userId}/otherExpenses`).get()
                .then(query => query.docs.map(doc => doc.ref))
                .catch(err => {
                    console.log(err);
                    return null
                })


            let newRelations: Relation[] = [];

            let expensesProm = expenses.map(eRef => eRef.get().then(eDoc => {
                let expense = eDoc.data() as Expense
                return eDoc.ref.collection('users').get().then(usersRef => {
                    return usersRef.docs
                        .filter(userRef => userRef.id !== expense.creator)
                        .map(userRef => {
                            let user = userRef.data() as ExpenseUser;
                            let relation = newRelations.find(r => r.userId === user.id)
                            if (!relation) {
                                relation = {
                                    userId: user.id,
                                    owesMe: 0,
                                    iOwe: 0,
                                    expenses: []
                                } as Relation
                                newRelations.push(relation);
                                console.log("relation recien creada")
                                console.log(relations)
                            }
                            relation.owesMe = relation.owesMe + user.individualAmount;
                        })
                })
            })
            )

            let otherExpensesProm = otherExpenses.map(eRef => eRef.get().then(eDoc => {
                let expense = eDoc.data() as Expense
                return eDoc.ref.collection('users').doc(userId).get().then(userRef => {
                    let user = userRef.data() as ExpenseUser
                    let relation = newRelations.find(r => user.id === expense.creator)
                    if (!relation) {
                        relation = {
                            userId: expense.creator,
                            owesMe: 0,
                            iOwe: 0,
                            expenses: []
                        } as Relation
                        newRelations.push(relation);
                        console.log("relation recien creada")
                        console.log(relations)
                    }
                    relation.iOwe = relation.iOwe + user.individualAmount;
                })
            }))


            await Promise.all([expensesProm, otherExpensesProm]);
            console.log("relations")
            console.log(relations)

            return Promise.all(newRelations.map(rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel)))
        }).catch(err => console.log(err))

}


const replicateExpense = function (event) {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;

    let expense = event.data.data() as Expense
    expense.id = expenseId;

    const expenseUsers = db.collection(`users/${userId}/expenses/${expenseId}/users`).get()

    return expenseUsers.then(query => Promise.all(query.docs
        .filter(doc => doc.id !== userId)
        .map(doc => {
            let expenseUser = doc.data() as ExpenseUser
            return db.collection(`users/${expenseUser.id}/otherExpenses/`).doc(expenseId).set(expense)
        })))
}

const replicateExpenseUser = function (event) {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    const expenseUserId = event.params.expenseUserId

    const expenseUser = event.data.data() as ExpenseUser

    return db.collection(`users/${expenseUserId}/otherExpenses/${expenseId}/users`).doc(expenseUserId).set(expenseUser)
}

const deleteOtherExpense = function (event) {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    const expenseUserId = event.params.expenseUserId

    return db.collection(`users/${expenseUserId}/otherExpenses/${expenseId}/users`).get()
        .then( query => Promise.all(query.docs.map( doc => doc.ref.delete() )) )
        .then(_ => db.doc(`users/${expenseUserId}/otherExpenses/${expenseId}`))
}

//------------------------------------------------------------------------------------------------------------------//
//  EXPENSES REPLICATION
//------------------------------------------------------------------------------------------------------------------//
//ON CREATE EXPENSE -> update expense in all the other users
exports.createExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onCreate(event => replicateExpense(event))

//ON UPDATE EXPENSE -> update expense in all the other users
exports.updateExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onUpdate(event => replicateExpense(event))

//------------------------------------------------------------------------------------------------------------------//
//  EXPENSE USER REPLICATION
//------------------------------------------------------------------------------------------------------------------//
//ON CREATE EXPENSE USER -> update expense in all the other users
exports.createExpenseUser = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{expenseUserId}')
    .onCreate(event => replicateExpense(event))

//ON UPDATE EXPENSE USER -> update expense in all the other users
exports.updateExpenseUser = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{expenseUserId}')
    .onUpdate(event => replicateExpense(event))

//ON DELETE EXPENSE USER -> delete expense in all the other users
exports.deleteExpenseUser = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{expenseUserId}')
    .onDelete(event => deleteOtherExpense(event))

//------------------------------------------------------------------------------------------------------------------//
//  RELATIONS RECALCULATION
//------------------------------------------------------------------------------------------------------------------//
exports.onWriteOwnExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onWrite(event => recalculateRelations(event.params.userId))

exports.onWriteOtherExpense = functions.firestore.document('users/{userId}/otherExpenses/{expenseId}')
    .onWrite(event => recalculateRelations(event.params.userId))

exports.onWriteOwnExpenseUser = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{userExpenseId}')
    .onWrite(event => recalculateRelations(event.params.userId))

exports.onWriteOtherExpenseUser = functions.firestore.document('users/{userId}/otherExpenses/{expenseId}/users/{userExpenseId}')
    .onWrite(event => recalculateRelations(event.params.userId))