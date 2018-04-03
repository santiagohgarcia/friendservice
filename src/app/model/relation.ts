import { Expense } from "./expense";

export interface Relation {
    userId: string;
    owesMe: number;
    iOwe: number;
    payedExpenses: Expense[];
    pendingExpenses: Expense[]
}
