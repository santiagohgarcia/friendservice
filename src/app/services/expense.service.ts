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

  user: UserInfo

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {

      this.afAuth.authState.subscribe(user => {
        if (user) {
           this.user = user.providerData[0]
        }
      });

  }

  getOwnExpenses() {
    return this.db.collection(`users/${this.user.uid}/expenses`).snapshotChanges()
      .map(actions =>
        actions.map(a => {
          let expense = a.payload.doc.data() as Expense
          expense.id = a.payload.doc.id
          return expense
        }))
  }

  getOtherExpenses() {
    return this.db.collection(`users/${this.user.uid}/otherExpenses`).snapshotChanges()
      .map(actions =>
        actions.map(a => {
          let expense = a.payload.doc.data() as Expense
          expense.id = a.payload.doc.id
          return expense
        }))
  }

  getExpense(id: string, type: string): Observable<Expense> {
    return this.db.doc(`users/${this.user.uid}/${type}/${id}`).snapshotChanges()
      .map(doc => {
        var expense = doc.payload.data() as Expense
        expense.id = doc.payload.id;
        return expense;
      });
  }

  addExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
    return this.db.collection(`users/${expense.creator}/expenses`).add(expense)
  }

  updateExpense(expense: Expense): Promise<any> {
    return this.db.doc(`users/${this.user.uid}/expenses/${expense.id}`).set(expense)
  }

  deleteExpense(expenseId: string) {
    return this.db.doc(`users/${this.user.uid}/expenses/${expenseId}`).delete()
  }



}
