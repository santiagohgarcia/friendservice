import { CollectionReference } from "@firebase/firestore-types";

export default interface User {
    id: string,
    relations: CollectionReference,
    expenses: CollectionReference
}