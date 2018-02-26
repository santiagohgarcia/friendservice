import * as admin from 'firebase-admin'
import User from './model/user'
import { Expense } from './model/expense';

export const createUser = function (id: string, db) {
    return db.collection('users').doc(id).set({
        id: id,
        relations: [],
        expenses: []
     } as User)
}

export const recalculateRelations = function (user: User, db: FirebaseFirestore.Firestore) {
    
   db.collection('users/relations')

   let expenses =  user.expenses.map( e => db.collection('expenses').doc(e.ref).get() )

   expenses.forEach( async e => {
       let expense = (await e).data() as Expense;
       if(expense.creator===user.id){
         
       }else{

       }
    })

}
