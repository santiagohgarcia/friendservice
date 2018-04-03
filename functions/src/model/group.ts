export interface Group {
    id: string;
    name: string;
    creator: string,
    users: string[]
}

export function InitialGroup(creatorId: string): Group {
    return {
        id: null,
        name: "",
        creator: creatorId,
        users: [ creatorId ]
    } as Group
}
