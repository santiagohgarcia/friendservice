import { CollectionReference, DocumentReference } from "@firebase/firestore-types";

export interface Expense {
    id: string;
    title: string;
    date: Date;
    creatorId: string, //reference to user
    totalAmount: number;
    expenseUsersIds: string[];
}

export function InitialExpense(): Expense {
return  {
    id: null,
    title: "",
    date: null,
    totalAmount: 0,
    expenseUsersIds: []
  } as Expense;
}