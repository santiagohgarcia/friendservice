import { DocumentReference } from "@firebase/firestore-types";

export default interface ToDo {
    id: string;
    title: string;
    description: string;
    date: Date;
    status: DocumentReference;
}