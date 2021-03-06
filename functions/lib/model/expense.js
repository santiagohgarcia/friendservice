"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InitialExpense(creatorId) {
    return {
        id: null,
        title: "",
        date: null,
        creator: creatorId,
        totalAmount: 0,
        users: [
            {
                id: creatorId,
                payed: true
            }
        ]
    };
}
exports.InitialExpense = InitialExpense;
//# sourceMappingURL=expense.js.map