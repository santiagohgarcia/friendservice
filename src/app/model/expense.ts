import FacebookUser from "./facebook-user"; 
import { Reference } from "./reference";

export interface Expense {
    id: string;
    title: string;
    date: Date;
    creator: string,
    totalAmount: number;
}

export function InitialExpense(creatorId: string): Expense {
   return {
       id: null,
       title: "",
       date: null,
       creator: creatorId,
       totalAmount: 0
   } as Expense
}
