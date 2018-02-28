import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

import { Expense } from './model/expense';
import User from './model/user';
import { user } from 'firebase-functions/lib/providers/auth';
import { Relation } from './model/relation';
import { ExpenseUser } from './model/expense-user';

admin.initializeApp(functions.config().firebase);

const db: FirebaseFirestore.Firestore = admin.firestore();

const recalculateRelations = function (userId: string) {

    console.log(userId)

    return db.collection(`users/${userId}/relations`).get()

        .then(query => {
            console.log("entro a borrar los registrs")
            return query.docs.map(q => q.ref.delete())
        })

        .then(async _ => {
            console.log("ya se borraron los registrs")

            const expenses: Expense[] = await db.collection(`users/${userId}/expenses`).get()
                .then(query => query.docs.map(doc => doc.id))
                .then(ids => Promise.all(ids.map(id => db.collection(`expenses`).doc(id).get())))
                .then(snaps => snaps.map(snap => {
                    let expense = snap.data() as Expense
                    expense.id = snap.id
                    return expense
                }))
                .catch(err => {
                    console.log(err);
                    return null
                })

            console.log(expenses)
            let relations: Relation[] = [];
            let relationsProm: Promise<any>;

            relationsProm = Promise.all(
                
                expenses.map(e => {

                return db.collection(`expenses/${e.id}/users`).get()
                    .then(query => {

                        let users = query.docs.map(d => {
                            let expenseUser = d.data() as ExpenseUser
                            expenseUser.id = d.id
                            return expenseUser
                        })
                        console.log(users)

                        let relation: Relation = null;
                        users.forEach(debtor => {

                            if (e.creator === debtor.id) {
                                console.log("debtor " + debtor)
                                relation = relations.find(r => r.userId === debtor.id)
                                if (!relation) {
                                    relation = {
                                        userId: debtor.id,
                                        owesMe: 0,
                                        iOwe: 0,
                                        expenses: []
                                    } as Relation
                                    relations.push(relation);
                                    console.log("relation recien creada")
                                    console.log(relations)
                                }
                                relation.owesMe = relation.owesMe + debtor.individualAmount;

                            } else {
                                relation = relations.find(r => r.userId === e.creator)
                                if (!relation) {
                                    relation = {
                                        userId: e.creator,
                                        owesMe: 0,
                                        iOwe: 0,
                                        expenses: []
                                    } as Relation
                                    relations.push(relation);
                                    console.log("relation recien creada")
                                    console.log(relations)
                                }
                                relation.iOwe = relation.iOwe + debtor.individualAmount;
                            }
                            relation.expenses.push(e.id);
                            console.log(relations)
                        })
                    }).catch(err => console.log(err))
            }))

            await relationsProm;
            console.log("relations")
            console.log(relations)

            return Promise.all(relations.map(rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel)))
        })
        .catch(err => console.log(err))
}

/* // ON CREATE EXPENSE
exports.addExpense = functions.firestore.document('expenses/{expenseId}').onCreate(event => {
    let expenseCreator = event.data.data().creator
    let expenseId = event.params.expenseId;
    //add to creator as creator expenses
    return db.collection(`users`).doc(expenseCreator).collection('expenses').doc(expenseId).set({});
})

// ON DELETE EXPENSE
exports.delExpense = functions.firestore.document('expenses/{expenseId}').onDelete(event => {
    const expenseCreator = event.data.previous.data().creator
    const expenseId = event.params.expenseId;
    //remove the expense from the creators list
    return db.doc(`users/${expenseCreator}/expenses/${expenseId}`).delete()
})
 
*/

// ON CREATE USER FROM EXPENSE
exports.addUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onCreate(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId
    return db.collection('users').doc(userId).collection('expenses').doc(expenseId).set({})
})

// ON MODIFICATION USER FROM EXPENSE
exports.modifyExpenseUser = functions.firestore.document('expenses/{expenseId}/users/{userId}').onUpdate(event => {
    const userId = event.params.userId;
    return recalculateRelations(userId);
})

// ON DELETE USER FROM EXPENSE
exports.deleteUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onDelete(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    return db.collection('users').doc(userId).collection('expenses').doc(expenseId).delete()
})

// ALL MODIFICATIONS TO EXPENSES
exports.recalculateRelationsOnWrite = functions.firestore.document('users/{userId}/expenses/{expenseId}').onWrite(event => {
    const userId = event.params.userId;
    return recalculateRelations(userId);
})


