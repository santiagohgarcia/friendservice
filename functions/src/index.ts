import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import * as users from './users'

import * as expenses from './expenses'
import { Expense } from './model/expense';
import User from './model/user';

admin.initializeApp(functions.config().firebase);

const db : FirebaseFirestore.Firestore = admin.firestore();


exports.userCreation = functions.auth.user().onCreate(event =>{
    return users.createUser(event.data.providerData[0].uid,db);
})

exports.addExpense = functions.firestore.document('expenses/{expensesId}').onCreate( event =>{
    let expense = event.data.data() as Expense;
    expense.id = event.data.id;
    expenses.writeExpense(expense,db);
    return 0;
})

exports.updExpense = functions.firestore.document('expenses/{expensesId}').onUpdate( event =>{
    let expense = event.data.data() as Expense;
    expense.id = event.data.id;
    expenses.writeExpense(expense,db);
    return 0;
})

exports.delExpense = functions.firestore.document('expenses/{expensesId}').onDelete( event =>{
    console.log(event);
    console.log(event.data.previous.data())
    console.log(event.data.previous.id)
    let expense = event.data.previous.data() as Expense;
    expense.id = event.data.previous.id;
    expenses.deleteExpense(expense,db);
    return 0;
})

exports.userUpdate = functions.firestore.document('users/{userId}').onUpdate(event => {
    console.log(event.data.data())
    users.recalculateRelations(event.data.data() as User,db).catch(err => console.log(err))
    return 0;
})