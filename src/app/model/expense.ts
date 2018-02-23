import User from "./user"; 

export interface Expense {
    id: string;
    title: string;
    date: Date;
    totalAmount: number;
    users: User[];
}

export const InitialExpense: Expense = {
    id: null,
    title: "",
    date: null,
    totalAmount: 0,
    users: []
  } as Expense;