import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as users from './users/users'
import * as expenses from './expenses/expenses'

admin.initializeApp(functions.config().firebase);

const db : FirebaseFirestore.Firestore = admin.firestore();

exports.createUser = functions.auth.user().onCreate(event => {
  return users.createUser(event.data.providerData[0].uid,db)
    });

exports.addExpense = functions.firestore.document('/expenses/{expenseId}').onCreate( event => {
  return  expenses.updateExpenseInUsersList(event.data.ref,db)
});

exports.updExpense = functions.firestore.document('/expenses/{expenseId}').onUpdate( event => {
  return  expenses.updateExpenseInUsersList(event.data.ref,db)
});

exports.removeExpense = functions.firestore.document('/expenses/{expenseId}').onDelete( event => {
  return expenses.removeExpenseInUsersList(event.data.ref)
});

exports.addExpenseInUsersList = functions.firestore.document('/users/{userId}/expenses/{expenseId}')
  .onWrite(event => { 
  //  users.recalculateRelations(event.data.ref)
  })