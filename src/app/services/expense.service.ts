import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, flatMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Expense } from '../model/expense';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ExpenseUser } from '../model/expense-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '@firebase/auth-types';


@Injectable()
export class ExpenseService {

  user: string

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => this.user = user.providerData[0].uid) 
    }

  ngOnInit() {
    
  }

  getOwnExpenses() {
    return this.db.collection(`users/${this.user}/expenses`).snapshotChanges()
      .map(actions =>
        actions.map(a => {
          let expense = a.payload.doc.data() as Expense
          expense.id = a.payload.doc.id
          return expense
        }))
  }

  getOtherExpenses() {
    return this.db.collection(`users/${this.user}/otherExpenses`).snapshotChanges()
      .map(actions =>
        actions.map(a => {
          let expense = a.payload.doc.data() as Expense
          expense.id = a.payload.doc.id
          return expense
        }))
  }

  getExpense(id: string,type:string): Observable<Expense> {
    return this.db.doc(`users/${this.user}/${type}/${id}`).snapshotChanges()
      .map(doc => {
        var expense = doc.payload.data() as Expense
        expense.id = doc.payload.id;
        return expense;
      });
  }

  getExpenseUsers(id: string,type:string): Observable<string[]> {
    return this.db.collection(`users/${this.user}/${type}/${id}/users`).snapshotChanges()
      .map(action => action.map(a => a.payload.doc.id));
  }

  addExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
    return this.db.collection(`users/${expense.creator}/expenses`).add(expense)
      .then(doc => expenseUsers.forEach(user => doc.collection('users').doc(user).set({
        id: user,
        individualAmount: expense.totalAmount / expenseUsers.length
      } as ExpenseUser))
      )
  }

  updateExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
    let expenseRef = this.db.doc(`users/${this.user}/expenses/${expense.id}`);
    let expenseUsersRef = this.db.collection(`users/${this.user}/expenses/${expense.id}/users`);
    return expenseRef.update(expense)
      .then(_ => expenseUsersRef.ref.get())
      .then(query => Promise.all(
        query.docs.map(doc => {
          if (!expenseUsers.find(eu => eu === doc.id)) { doc.ref.delete() }
        })))
      .then(_ => expenseUsers.map(user =>
        expenseUsersRef.doc(user).set({
          id: user,
          individualAmount: expense.totalAmount / expenseUsers.length
        } as ExpenseUser)))
  }

  deleteExpense(expenseId: string) {
    return this.deleteExpenseUsers(expenseId).then(_ =>
      this.db.doc(`users/${this.user}/expenses/${expenseId}`).delete())
  }

  deleteExpenseUsers(expenseId: string): Promise<any> { // TODO: hacerlo por cloud functions
    return this.db.collection(`users/${this.user}/expenses/${expenseId}/users`).ref.get()
      .then(query => query.docs.map(doc => doc.ref.delete()))
  }

}
