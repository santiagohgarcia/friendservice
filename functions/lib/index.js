"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const users = require("./users");
const expenses = require("./expenses");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.userCreation = functions.auth.user().onCreate(event => {
    return users.createUser(event.data.providerData[0].uid, db);
});
exports.addExpense = functions.firestore.document('expenses/{expensesId}').onCreate(event => {
    let expense = event.data.data();
    expense.id = event.data.id;
    expenses.writeExpense(expense, db);
    return 0;
});
exports.updExpense = functions.firestore.document('expenses/{expensesId}').onUpdate(event => {
    let expense = event.data.data();
    expense.id = event.data.id;
    expenses.writeExpense(expense, db);
    return 0;
});
exports.delExpense = functions.firestore.document('expenses/{expensesId}').onDelete(event => {
    console.log(event);
    console.log(event.data.previous.data());
    console.log(event.data.previous.id);
    let expense = event.data.previous.data();
    expense.id = event.data.previous.id;
    expenses.deleteExpense(expense, db);
    return 0;
});
//# sourceMappingURL=index.js.map