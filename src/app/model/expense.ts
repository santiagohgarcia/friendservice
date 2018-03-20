import { ExpenseUser } from "./expense-user";

export interface Expense {
    id: string;
    title: string;
    date: Date;
    creator: string,
    totalAmount: number;
    users: ExpenseUser[]
}

export function InitialExpense(creatorId: string): Expense {
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
            } as ExpenseUser
        ]
    } as Expense
}
