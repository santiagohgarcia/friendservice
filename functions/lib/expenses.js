"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExpenseToUser = function (userId, expenseId, db) {
    db.collection('users').doc(userId).get().then(doc => {
        console.log(doc);
        let user = doc.data();
        if (!user.expenses.find(e => e.ref === expenseId)) {
            user.expenses.push({ ref: expenseId });
        }
        console.log(user.expenses);
        doc.ref.set(user).catch(e => console.log(e));
    }).catch(e => console.log(e));
};
exports.deleteExpenseToUser = function (userId, expenseId, db) {
    db.collection('users').doc(userId).get().then(doc => {
        let user = doc.data();
        user.expenses = user.expenses.filter(e => e.ref != expenseId);
        doc.ref.set(user).catch(e => console.log(e));
    }).catch(e => console.log(e));
};
exports.writeExpense = function (expense, db) {
    // agregar el expense al usuario creador
    exports.addExpenseToUser(expense.creator, expense.id, db);
    // agregar el expense a los usuarios deudores
    expense.users.forEach(uid => exports.addExpenseToUser(uid.ref, expense.id, db));
};
exports.deleteExpense = function (expense, db) {
    // delete el expense al usuario creador
    exports.deleteExpenseToUser(expense.creator, expense.id, db);
    // delete el expense a los usuarios deudores
    expense.users.forEach(uid => exports.deleteExpenseToUser(uid.ref, expense.id, db));
};
//# sourceMappingURL=expenses.js.map