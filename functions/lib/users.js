"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = function (id, db) {
    return db.collection('users').doc(id).set({
        id: id,
        relations: [],
        expenses: []
    });
};
//# sourceMappingURL=users.js.map