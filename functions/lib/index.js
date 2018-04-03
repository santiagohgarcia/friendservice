"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const recalculateRelations = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newRelations = [];
        const getOrCreateRelation = function (relationUserId) {
            let relation = newRelations.find(r => r.userId === relationUserId);
            if (!relation) {
                relation = {
                    userId: relationUserId,
                    owesMe: 0,
                    iOwe: 0,
                    payedExpenses: [],
                    pendingExpenses: []
                };
                newRelations.push(relation);
            }
            return relation;
        };
        // delete relations
        const oldRelations = Promise.all((yield db.collection(`users/${userId}/relations`).get())
            .docs.map(doc => db.doc(`users/${userId}/relations/${doc.id}`).delete()));
        // calculate new relations
        // get own expenses
        const expenses = (yield db.collection(`users/${userId}/expenses`).get())
            .docs.map(doc => {
            const expense = doc.data();
            expense.id = doc.id;
            return expense;
        });
        // get other expenses
        const otherExpenses = (yield db.collection(`users/${userId}/otherExpenses`).get())
            .docs.map(doc => {
            const expense = doc.data();
            expense.id = doc.id;
            return expense;
        });
        expenses.map(e => e.users.filter(eu => eu.id !== e.creator)
            .map(eu => {
            const relation = getOrCreateRelation(eu.id);
            if (eu.payed) {
                relation.payedExpenses.push(e);
            }
            else {
                relation.owesMe = relation.owesMe + eu.individualAmount;
                relation.pendingExpenses.push(e);
            }
        }));
        otherExpenses.map(e => {
            const expenseUser = e.users.find(eu => eu.id === userId);
            const relation = getOrCreateRelation(e.creator);
            if (expenseUser.payed) {
                relation.payedExpenses.push(e);
            }
            else {
                relation.iOwe = relation.iOwe + expenseUser.individualAmount;
                relation.pendingExpenses.push(e);
            }
        });
        return oldRelations.then(_ => Promise.all(newRelations.map(rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel))));
    });
};
const replicateExpense = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = event.params.userId;
        const expenseId = event.params.expenseId;
        const expense = (yield db.doc(`users/${userId}/expenses/${expenseId}`).get()).data();
        const debtors = expense.users.filter(u => u.id !== userId);
        return Promise.all(debtors.map(d => db.doc(`users/${d.id}/otherExpenses/${expenseId}`).set(expense)));
    });
};
const removeExpenseFromDeletedUsers = function (event) {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    const prevExpense = event.data.previous.data();
    const newExpense = event.data.data();
    // get the removed users filtering the old that are not in the new
    const removedUsers = prevExpense.users.filter(pu => !newExpense.users.find(nu => nu.id === pu.id));
    return Promise.all(removedUsers.map(ru => db.doc(`users/${ru.id}/otherExpenses/${expenseId}`).delete()));
};
const deleteExpense = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = event.params.userId;
        const expenseId = event.params.expenseId;
        const deletedExpense = event.data.previous.data();
        const debtors = deletedExpense.users.filter(u => u.id !== userId);
        return Promise.all(debtors.map(d => db.doc(`users/${d.id}/otherExpenses/${expenseId}`).delete()));
    });
};
//------------------------------------------------------------------------------------------------------------------//
//  EXPENSES REPLICATION
//------------------------------------------------------------------------------------------------------------------//
//ON CREATE EXPENSE -> update expense in all the other users
exports.createExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onCreate(event => replicateExpense(event));
//ON UPDATE EXPENSE -> update expense in all the other users
exports.updateExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onUpdate(event => Promise.all([replicateExpense(event),
    removeExpenseFromDeletedUsers(event)]));
//ON DELETE EXPENSE -> update expense in all the other users
exports.deleteExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onDelete(event => deleteExpense(event));
//------------------------------------------------------------------------------------------------------------------//
//  RELATIONS RECALCULATION
//------------------------------------------------------------------------------------------------------------------//
exports.onWriteOwnExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}')
    .onWrite(event => recalculateRelations(event.params.userId));
exports.onWriteOtherExpense = functions.firestore.document('users/{userId}/otherExpenses/{expenseId}')
    .onWrite(event => recalculateRelations(event.params.userId));
//# sourceMappingURL=index.js.map