import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Expense } from '../model/expense';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ExpenseUser } from '../model/expense-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '@firebase/auth-types';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ExpenseService {

  user: Observable<UserInfo>

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.map(user => user.providerData[0]);
  }

  getOwnExpenses() {
    return this.user.flatMap(user =>
      this.db.collection(`users/${user.uid}/expenses`).snapshotChanges()
        .map(actions =>
          actions.map(a => {
            let expense = a.payload.doc.data() as Expense
            expense.id = a.payload.doc.id
            return expense
          })))
  }

  getOtherExpenses() {
    return this.user.flatMap(user =>
      this.db.collection(`users/${user.uid}/otherExpenses`).snapshotChanges()
        .map(actions =>
          actions.map(a => {
            let expense = a.payload.doc.data() as Expense
            expense.id = a.payload.doc.id
            return expense
          })))
  }

  getExpense(id: string, type: string): Observable<Expense> {
    return this.user.flatMap(user =>
      this.db.doc(`users/${user.uid}/${type}/${id}`).snapshotChanges()
        .map(doc => {
          var expense = doc.payload.data() as Expense
          expense.id = doc.payload.id;
          return expense;
        }));
  }

  addExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
    return this.db.collection(`users/${expense.creator}/expenses`).add(expense)
  }

  updateExpense(expense: Expense): Promise<any> {
    return this.user.flatMap(user =>
      this.db.doc(`users/${user.uid}/expenses/${expense.id}`).set(expense))
      .toPromise();
  }

  deleteExpense(expenseId: string) {
    return this.user.flatMap(user => 
      this.db.doc(`users/${user.uid}/expenses/${expenseId}`).delete())
      .toPromise()
  }



}
