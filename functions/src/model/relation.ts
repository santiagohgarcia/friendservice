import FacebookUser from "./facebook-user"; 
import { Reference } from "./reference";

export interface Relation {
    userId: string;
    myDebt: number;
    userDebt: number;
    expenses: Reference[];
}

export function InitialRelation(user: string): Relation {
   return {
    userId: user,
    myDebt: 0,
    userDebt: 0,
    expenses: []
   } as Relation
}
