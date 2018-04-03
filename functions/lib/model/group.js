"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InitialGroup(creatorId) {
    return {
        id: null,
        name: "",
        creator: creatorId,
        users: [creatorId]
    };
}
exports.InitialGroup = InitialGroup;
//# sourceMappingURL=group.js.map