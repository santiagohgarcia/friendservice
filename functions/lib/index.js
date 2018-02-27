"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.addExpense = functions.firestore.document('expenses/{expenseId}').onCreate(event => {
    let expenseCreator = event.data.data().creator;
    let expenseId = event.params.expenseId;
    //add to creator as creator expenses
    return db.collection(`users`).doc(expenseCreator).collection('myExpenses').doc(expenseId).set({});
});
exports.delExpense = functions.firestore.document('expenses/{expenseId}').onDelete(event => {
    console.log(event.data.previous.data());
    console.log(event.data.previous);
    const expenseCreator = event.data.previous.data().creator;
    const expenseId = event.params.expenseId;
    //remove the expense from the creators list
    return db.doc(`users/${expenseCreator}/myExpenses/${expenseId}`).delete();
});
exports.addUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onCreate(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    return db.collection('users').doc(userId).collection('otherExpenses').doc(expenseId).set({});
});
exports.deleteUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onDelete(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    return db.collection('users').doc(userId).collection('otherExpenses').doc(expenseId).delete();
});
/* exports.updExpense = functions.firestore.document('expenses/{expensesId}').onUpdate( event =>{
     let expense = event.data.data() as Expense;
    expense.id = event.data.id;
    expenses.writeExpense(expense,db);
    return 0;
}) */
/* exports.userUpdate = functions.firestore.document('users/{userId}').onUpdate(event => {
    console.log(event.data.data())
    users.recalculateRelations(event.data.data() as User,db).catch(err => console.log(err))
    return 0;
}) */ 
//# sourceMappingURL=index.js.map