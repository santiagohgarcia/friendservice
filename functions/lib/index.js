"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const users = require("./users/users");
const expenses = require("./expenses/expenses");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.createUser = functions.auth.user().onCreate(event => {
    return users.createUser(event.data.providerData[0].uid, db);
});
exports.addExpense = functions.firestore.document('/expenses/{expenseId}').onCreate(event => {
    return expenses.updateExpenseInUsersList(event.data.ref);
});
exports.updExpense = functions.firestore.document('/expenses/{expenseId}').onUpdate(event => {
    return expenses.updateExpenseInUsersList(event.data.ref);
});
exports.removeExpense = functions.firestore.document('/expenses/{expenseId}').onDelete(event => {
    return expenses.removeExpenseInUsersList(event.data.ref);
});
exports.addExpenseInUsersList = functions.firestore.document('/users/{userId}/expenses/{expenseId}')
    .onWrite(event => {
    //  users.recalculateRelations(event.data.ref)
});
//# sourceMappingURL=index.js.map