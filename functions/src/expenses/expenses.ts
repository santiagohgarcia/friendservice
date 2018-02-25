import User from '../model/user'
import { Expense } from '../model/expense'
import { DocumentReference } from '@firebase/firestore-types';

import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

//admin.initializeApp(functions.config().firebase);

export const updateExpenseInUsersList = async function (expenseRef: DocumentReference, db:FirebaseFirestore.Firestore) {
    console.log(expenseRef)
    const expense = ( await expenseRef.get() ).data() as Expense
    console.log(expense)
    var expenseUsers = expense.expenseUsersIds.map( id => db.doc(`/users/${id}`) )
    console.log(expenseUsers)
    return expenseUsers.map(expenseUser => expenseUser..doc(expense.id).set(expenseRef))
}

export const removeExpenseInUsersList = async function (expenseRef: DocumentReference) {

    const expense = ( await expenseRef.get() ).data() as Expense
    const expenseUsers = (await expense.expenseUsers.get()).docs.map(qs => qs.data() as User)

    return expenseUsers.map(expenseUser => expenseUser.expenses.doc(expense.id).delete() )
}
