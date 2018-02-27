import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

import { Expense } from './model/expense';
import User from './model/user';
import { user } from 'firebase-functions/lib/providers/auth';
import { Relation } from './model/relation';

admin.initializeApp(functions.config().firebase);

const db: FirebaseFirestore.Firestore = admin.firestore();

exports.addExpense = functions.firestore.document('expenses/{expenseId}').onCreate(event => {
    let expenseCreator = event.data.data().creator
    let expenseId = event.params.expenseId;
    //add to creator as creator expenses
    return db.collection(`users`).doc(expenseCreator).collection('myExpenses').doc(expenseId).set({});
})

exports.delExpense = functions.firestore.document('expenses/{expenseId}').onDelete(event => {
    console.log(event.data.previous.data())
    console.log(event.data.previous)
    const expenseCreator = event.data.previous.data().creator
    const expenseId = event.params.expenseId;
    //remove the expense from the creators list
    return db.doc(`users/${expenseCreator}/myExpenses/${expenseId}`).delete()
})

exports.addUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onCreate(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId
    return db.collection('users').doc(userId).collection('otherExpenses').doc(expenseId).set({})
})

exports.deleteUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onDelete(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId
    return db.collection('users').doc(userId).collection('otherExpenses').doc(expenseId).delete()
})

exports.recalculateRelations = functions.firestore.document('users/{userId}/myExpenses/{expenseId}').onWrite(event => {
    const userId = event.params.userId;
    return db.collection(`users/${userId}/relations`).get()
        .then(query => query.docs.map(q => q.ref.delete()))
        .then(_ => recalculateRelations(userId));
})

exports.recalculateRelations = functions.firestore.document('users/{userId}/myExpenses/{expenseId}').onWrite(event => {
    const userId = event.params.userId;
    return db.collection(`users/${userId}/relations`).get()
        .then(query => query.docs.map(q => q.ref.delete()))
        .then(_ => recalculateRelations(userId));
})

exports.recalculateRelations = functions.firestore.document('users/{userId}/otherExpenses/{expenseId}').onWrite(event => {
    const userId = event.params.userId;
    return db.collection(`users/${userId}/relations`).get()
        .then(query => query.docs.map(q => q.ref.delete()))
        .then(_ => recalculateRelations(userId));
})

const recalculateRelations = async function (userId: string) {
    const myExpenses = (await db.collection(`users/${userId}/myExpenses`).get())
                       .docs.map( doc => doc.data() as Expense)
    const otherExpenses = (await db.collection(`users/${userId}/otherExpenses`).get())
                       .docs.map( doc => doc.data() as Expense)

    let relations: Relation[] = [];

    let expenses = myExpenses.concat(otherExpenses);

    expenses.forEach( async e => {

        let users = ( await db.collection(`expenses/${e.id}/users`).get() ).docs.map( d => d.id )

        let individualAmount = ( e.totalAmount / users.length + 1 )

        if(e.creator === userId){
            users.forEach( debtor => { 
                let relation = relations.find(r => r.userId === debtor)
                if(!relation){
                    relation = {
                        userId: debtor,
                        owesMe: 0,
                        iOwe: 0
                    } as Relation
                    relations.push(relation);
                }
                relation.owesMe += individualAmount;                
            })
        }else{
            let relation = relations.find(r => r.userId === e.creator)
            if(!relation){
                relation = {
                    userId: e.creator,
                    owesMe: 0,
                    iOwe: 0
                } as Relation
                relations.push(relation);
            }
            relation.iOwe += individualAmount;
        }
    })

   return Promise.all(relations.map( rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel) ))
} 
