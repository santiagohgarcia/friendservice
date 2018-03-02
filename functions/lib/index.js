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
    console.log(userId);
    return db.collection(`users/${userId}/relations`).get()
        .then(query => {
        console.log("entro a borrar los registrs");
        return query.docs.map(q => q.ref.delete());
    })
        .then((_) => __awaiter(this, void 0, void 0, function* () {
        console.log("ya se borraron los registrs");
        const expenses = yield db.collection(`users/${userId}/expenses`).get()
            .then(query => query.docs.map(doc => doc.id))
            .then(ids => Promise.all(ids.map(id => db.collection(`expenses`).doc(id).get())))
            .then(snaps => snaps.map(snap => {
            let expense = snap.data();
            expense.id = snap.id;
            return expense;
        }))
            .catch(err => {
            console.log(err);
            return null;
        });
        console.log(expenses);
        let relations = [];
        let relationsProm;
        relationsProm = Promise.all(expenses.map(e => {
            return db.collection(`expenses/${e.id}/users`).get()
                .then(query => {
                let users = query.docs.map(d => {
                    let expenseUser = d.data();
                    expenseUser.id = d.id;
                    return expenseUser;
                });
                console.log(users);
                let relation = null;
                if (e.creator === userId) {
                    users.filter(u => u.id != e.creator)
                        .forEach(debtor => {
                        console.log("debtor " + debtor);
                        relation = relations.find(r => r.userId === debtor.id);
                        if (!relation) {
                            relation = {
                                userId: debtor.id,
                                owesMe: 0,
                                iOwe: 0,
                                expenses: []
                            };
                            relations.push(relation);
                            console.log("relation recien creada");
                            console.log(relations);
                        }
                        relation.owesMe = relation.owesMe + debtor.individualAmount;
                    });
                }
                else {
                    let debtor = users.find(u => u.id === userId);
                    relation = relations.find(r => r.userId === e.creator);
                    if (!relation) {
                        relation = {
                            userId: e.creator,
                            owesMe: 0,
                            iOwe: 0,
                            expenses: []
                        };
                        relations.push(relation);
                        console.log("relation recien creada");
                        console.log(relations);
                    }
                    relation.iOwe = relation.iOwe + debtor.individualAmount;
                }
                relation.expenses.push(e.id);
                console.log(relations);
            }).catch(err => console.log(err));
        }));
        yield relationsProm;
        console.log("relations");
        console.log(relations);
        return Promise.all(relations.map(rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel)));
    }))
        .catch(err => console.log(err));
};
const replicateExpense = function (userId, expenseId, expenseUserId) {
    if (userId === expenseUserId) {
        return 0;
    }
    let expense = db.doc(`users/${userId}/expenses/${expenseId}`).get();
    let deleteOldExpenseUsers = db.collection(`users/${expenseUserId}/otherExpenses/${expenseId}/users`).get()
        .then(query => Promise.all(query.docs.map(doc => doc.ref.delete())));
    let expenseUsers = db.collection(`users/${userId}/expenses/${expenseId}/users`).get();
    return Promise.all([
        expense.then(e => db.collection(`users/${expenseUserId}/otherExpenses`).doc(expenseId).set(e.data())),
        deleteOldExpenseUsers.then(_ => expenseUsers.then(eus => Promise.all(eus.docs.map(eu => db.collection(`users/${expenseUserId}/otherExpenses/${expenseId}/users`).doc(eu.id).set(eu.data())))))
    ]);
};
const replicateExpenseDeletion = function (userId, expenseId, expenseUserId) {
    if (userId === expenseUserId) {
        return 0;
    }
    let expenseUsers = db.collection(`users/${expenseUserId}/otherExpenses/${expenseId}/users`).get();
    return Promise.all([
        db.collection(`users/${expenseUserId}/otherExpenses`).doc(expenseId).delete(),
        expenseUsers.then(eus => Promise.all(eus.docs.map(eu => db.collection(`users/${expenseUserId}/otherExpenses/${expenseId}/users`).doc(eu.id).delete())))
    ]);
};
// ON CREATE USER FROM EXPENSE -> replicate expense in the other user
exports.addUserToExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{expenseUserId}').onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    const expenseUserId = event.params.expenseUserId;
    return replicateExpense(userId, expenseId, expenseUserId);
}));
// ON DELETE USER FROM EXPENSE -> delete expense in the other user
exports.deleteUserToExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{expenseUserId}').onDelete((event) => __awaiter(this, void 0, void 0, function* () {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    const expenseUserId = event.params.expenseUserId;
    return replicateExpenseDeletion(userId, expenseId, expenseUserId);
}));
/* // ON UPDATE USER FROM EXPENSE -> update expense in the other user
exports.updateUserToExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}/users/{expenseUserId}').onUpdate(async event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    const expenseUserId = event.params.expenseUserId;

    return replicateExpense(userId, expenseId, expenseUserId);
})
 */
//ON UPDATE EXPENSE -> update expense in all the other users
exports.updateExpense = functions.firestore.document('users/{userId}/expenses/{expenseId}').onUpdate((event) => __awaiter(this, void 0, void 0, function* () {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    let expenseUsers = db.collection(`users/${userId}/expenses/${expenseId}/users`).get();
    return expenseUsers.then(query => query.docs
        .filter(eu => eu.id != userId)
        .map(eu => replicateExpense(userId, expenseId, eu.id)));
}));
//# sourceMappingURL=index.js.map