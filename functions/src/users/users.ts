import * as admin from 'firebase-admin'
import User from '../model/user'
import { DocumentReference } from '@firebase/firestore-types';

export const createUser = function (id: string, db) {
    return db.collection('users').doc(id).set({
        id: id,
        relations: null,
        expenses: null
     } as User)
}

export const recalculateRelations = async function (expenseRef: DocumentReference){
  //  var userRef = expenseRef.parent.parent;
  //  var expenses = userRef.collection('expenses').get()
}
