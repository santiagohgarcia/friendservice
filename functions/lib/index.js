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
            .catch(err => {
            console.log(err);
            return null;
        });
        console.log(expenses);
        let relations = [];
        let relationsProm;
        expenses.forEach(e => {
            let expense = e.data();
            expense.id = e.id;
            relationsProm = db.collection(`expenses/${expense.id}/users`).get()
                .then(query => {
                let users = query.docs.map(d => d.id).filter(id => id != expense.creator);
                console.log(users);
                let individualAmount = expense.totalAmount / (users.length + 1);
                console.log("individual amount" + individualAmount);
                let relation = null;
                if (expense.creator === userId) {
                    users.forEach(debtor => {
                        console.log("debtor " + debtor);
                        relation = relations.find(r => r.userId === debtor);
                        if (!relation) {
                            relation = {
                                userId: debtor,
                                owesMe: 0,
                                iOwe: 0,
                                expenses: []
                            };
                            relations.push(relation);
                            console.log("relation recien creada");
                            console.log(relations);
                        }
                        relation.owesMe = relation.owesMe + individualAmount;
                    });
                }
                else {
                    relation = relations.find(r => r.userId === expense.creator);
                    if (!relation) {
                        relation = {
                            userId: expense.creator,
                            owesMe: 0,
                            iOwe: 0,
                            expenses: []
                        };
                        relations.push(relation);
                        console.log("relation recien creada");
                        console.log(relations);
                    }
                    relation.iOwe = relation.iOwe + individualAmount;
                }
                relation.expenses.push(e.id);
                console.log(relations);
            }).catch(err => console.log(err));
        });
        yield relationsProm;
        console.log("relations");
        console.log(relations);
        return Promise.all(relations.map(rel => db.collection(`users/${userId}/relations`).doc(rel.userId).set(rel)));
    }))
        .catch(err => console.log(err));
};
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
    const expenseId = event.params.expenseId;
    return db.collection('users').doc(userId).collection('expenses').doc(expenseId).set({});
});
// ON CREATE USER FROM EXPENSE
exports.updUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onUpdate(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    return db.collection('users').doc(userId).collection('expenses').doc(expenseId).set({});
});
// ON DELETE USER FROM EXPENSE
exports.deleteUserToExpense = functions.firestore.document('expenses/{expenseId}/users/{userId}').onDelete(event => {
    const userId = event.params.userId;
    const expenseId = event.params.expenseId;
    return db.collection('users').doc(userId).collection('expenses').doc(expenseId).delete();
});
// ALL MODIFICATIONS TO EXPENSES
exports.recalculateRelationsOnWrite = functions.firestore.document('users/{userId}/expenses/{expenseId}').onWrite(event => {
    const userId = event.params.userId;
    return recalculateRelations(userId);
});
//# sourceMappingURL=index.js.map