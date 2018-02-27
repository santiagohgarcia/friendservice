import FacebookUser from "./facebook-user"; 
import { Reference } from "./reference";

export interface Relation {
    userId: string;
    owesMe: number;
    iOwe: number;
}
