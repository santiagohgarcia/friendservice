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
exports.createUser = function (id, db) {
    return db.collection('users').doc(id).set({
        id: id,
        relations: [],
        expenses: []
    });
};
exports.recalculateRelations = function (user, db) {
    return __awaiter(this, void 0, void 0, function* () {
        db.collection('users/relations');
        user.expenses.forEach((e) => __awaiter(this, void 0, void 0, function* () {
            let expense = (yield db.collection('expenses').doc(e.ref).get()).data();
            let individualAmount = (expense.totalAmount / expense.users.length + 1);
            expense.users.forEach((expenseUser) => __awaiter(this, void 0, void 0, function* () {
                let relationRef = db.collection('users').doc(user.id).collection('relations').doc(expenseUser.ref);
                console.log(relationRef);
                let relation = (yield relationRef.get()).data();
                console.log(relation);
                relation.userId = expenseUser.ref;
                if (expense.creator === user.id) {
                    (relation.myDebt) ? relation.myDebt -= individualAmount : individualAmount;
                    (relation.userDebt) ? relation.userDebt += individualAmount : individualAmount;
                }
                else {
                    (relation.myDebt) ? relation.myDebt += individualAmount : individualAmount;
                    (relation.userDebt) ? relation.userDebt -= individualAmount : individualAmount;
                }
                relation.myDebt = (relation.myDebt > 0) ? relation.myDebt : 0;
                relation.userDebt = (relation.userDebt > 0) ? relation.userDebt : 0;
                if (!relation.expenses.find(exp => exp.ref === expense.id)) {
                    relation.expenses.push({ ref: expense.id });
                }
                console.log(relation);
                relationRef.set(relation).catch(err => console.log(err));
            }));
        }));
    });
};
//# sourceMappingURL=users.js.map