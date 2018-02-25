import { CollectionReference } from "@firebase/firestore-types";
import Relation from "./relation";

export default interface User {
    id: string,
    relations: Relation[],
    expenses: string[]
}