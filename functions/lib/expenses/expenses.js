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
//admin.initializeApp(functions.config().firebase);
exports.updateExpenseInUsersList = function (expenseRef) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(expenseRef);
        const expense = (yield expenseRef.get()).data();
        console.log(expense);
        const expenseUsers = (yield expense.expenseUsers.get()).docs.map(qs => qs.data());
        console.log(expenseUsers);
        return expenseUsers.map(expenseUser => expenseUser.expenses.doc(expense.id).set(expenseRef));
    });
};
exports.removeExpenseInUsersList = function (expenseRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = (yield expenseRef.get()).data();
        const expenseUsers = (yield expense.expenseUsers.get()).docs.map(qs => qs.data());
        return expenseUsers.map(expenseUser => expenseUser.expenses.doc(expense.id).delete());
    });
};
//# sourceMappingURL=expenses.js.map