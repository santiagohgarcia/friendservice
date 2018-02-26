import * as admin from 'firebase-admin'
import { Expense } from './model/expense'
import User from './model/user';
import { Reference } from './model/reference';


export const addExpenseToUser = function (userId: string,expenseId: string,db: FirebaseFirestore.Firestore){
    db.collection('users').doc(userId).get().then(
        doc => {
            console.log(doc)
            let user = (doc.data() as User)
            if (!user.expenses.find(e => e.ref === expenseId)) {
                user.expenses.push({ ref: expenseId } as Reference)
            }
            console.log(user.expenses)
            doc.ref.set(user).catch(e=> console.log(e))
        }
    ).catch(e=> console.log(e))
}

export const deleteExpenseToUser = function (userId: string,expenseId: string,db: FirebaseFirestore.Firestore){
    db.collection('users').doc(userId).get().then(
        doc => {
            let user = (doc.data() as User)
            user.expenses = user.expenses.filter(e => e.ref != expenseId)
            doc.ref.set(user).catch(e=> console.log(e))
        }
    ).catch(e=> console.log(e))
}


export const writeExpense = function (expense: Expense, db: FirebaseFirestore.Firestore) {
    // agregar el expense al usuario creador
    addExpenseToUser(expense.creator,expense.id,db);
    // agregar el expense a los usuarios deudores
    expense.users.forEach( uid => addExpenseToUser(uid.ref,expense.id,db))
}

export const deleteExpense = function (expense: Expense, db: FirebaseFirestore.Firestore) {
    // delete el expense al usuario creador
    deleteExpenseToUser(expense.creator,expense.id,db);
    // delete el expense a los usuarios deudores
    expense.users.forEach( uid => deleteExpenseToUser(uid.ref,expense.id,db))
}