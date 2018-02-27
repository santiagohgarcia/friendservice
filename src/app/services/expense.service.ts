import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Expense } from '../model/expense';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { Reference } from '../model/reference';

@Injectable()
export class ExpenseService {

  constructor(private db: AngularFirestore) { }

  getExpenses(): Observable<Expense[]> {
    return this.db.collection('expenses').snapshotChanges()
      .map(actions => actions.map(a => {
        var expense = a.payload.doc.data() as Expense
        expense.id = a.payload.doc.id;
        return expense;
      }))
  }

  getExpense(id: string): Observable<Expense> {
    return this.db.doc(`expenses/${id}`).snapshotChanges()
      .map(doc => {
        var expense = doc.payload.data() as Expense
        expense.id = doc.payload.id;
        return expense;
      });
  }

  getExpenseUsers(id: string): Observable<string[]> {
    return this.db.collection(`expenses/${id}/users`).snapshotChanges()
      .map(action => action.map(a => a.payload.doc.id));
  }

  addExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
      return this.db.collection('expenses').add(expense)
      .then( doc => expenseUsers.forEach( user => doc.collection('users').doc(user).set({}) )           
    )
  }

  updateExpense(expense: Expense,expenseUsers: string[]): Promise<any> {
    let expenseRef = this.db.doc(`expenses/${expense.id}`);
    let expenseUsersRef = this.db.collection(`expenses/${expense.id}/users`).ref;
    return Promise.all([
      expenseRef.update(expense)
      .then(_ => expenseUsersRef.get()
                    .then(query => query.docs.map(doc => doc.ref.delete())) )
      .then(_ => expenseUsers.map(user => expenseUsersRef.doc(user).set({}) ) )
    ]) 
  }

  deleteExpense(expenseId: string) {
    return this.deleteExpenseUsers(expenseId).then(_ => 
           this.db.doc(`expenses/${expenseId}`).delete() )
  }

  deleteExpenseUsers(expenseId: string): Promise<any>{ // TODO: hacerlo por cloud functions
    return this.db.collection(`expenses/${expenseId}/users`).ref.get()
      .then(query => query.docs.map(doc => doc.ref.delete()))
  }

}
