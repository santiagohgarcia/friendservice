import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, flatMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Expense } from '../model/expense';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ExpenseUser } from '../model/expense-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '@firebase/auth-types';
import { Relation } from '../model/relation';


@Injectable()
export class ExpenseService {

  user: Promise<UserInfo>

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.first().toPromise().then(user => {
      if (user) {
        return this.user = Promise.resolve(user.providerData[0])
      }
    });
  }

  getOwnExpenses() {
    return Observable.fromPromise(this.user).switchMap(u =>
      this.db.collection(`users/${u.uid}/expenses`).snapshotChanges()
        .map(actions =>
          actions.map(a => {
            let expense = a.payload.doc.data() as Expense
            expense.id = a.payload.doc.id
            return expense
          })))
  }

  getOtherExpenses() {
    return Observable.fromPromise(this.user).switchMap(u =>
      this.db.collection(`users/${u.uid}/otherExpenses`).snapshotChanges()
        .map(actions =>
          actions.map(a => {
            let expense = a.payload.doc.data() as Expense
            expense.id = a.payload.doc.id
            return expense
          })))
  }

  getExpense(id: string, type: string): Observable<Expense> {
    return Observable.fromPromise(this.user).switchMap(u =>
      this.db.doc(`users/${u.uid}/${type}/${id}`).snapshotChanges()
        .map(doc => {
          var expense = doc.payload.data() as Expense
          expense.id = doc.payload.id;
          return expense;
        }))
  }

  addExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
    return this.db.collection(`users/${expense.creator}/expenses`).add(expense)
  }

  updateExpense(expense: Expense): Promise<any> {
    return this.db.doc(`users/${expense.creator}/expenses/${expense.id}`).set(expense)
  }

  deleteExpense(expense: Expense) {
    return this.db.doc(`users/${expense.creator}/expenses/${expense.id}`).delete()
  }

  getRelations() : Observable<Relation[]> {
    return Observable.fromPromise(this.user).switchMap(u =>
      this.db.collection(`users/${u.uid}/relations`).snapshotChanges()
        .map(actions =>
          actions.map(a => a.payload.doc.data() as Relation)))
  }

}
