import { CollectionReference } from "@firebase/firestore-types";


export default interface Relation {
    myDebt: number,
    debtorDebt: number,
    expenses: string[]
}