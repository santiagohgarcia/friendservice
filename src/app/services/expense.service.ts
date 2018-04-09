import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { map, mergeAll, flatMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Expense } from '../model/expense';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ExpenseUser } from '../model/expense-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '@firebase/auth-types';
import { Relation } from '../model/relation';
import { AuthService } from './auth.service';


@Injectable()
export class ExpenseService {

  constructor(private db: AngularFirestore,
    private authService: AuthService) {
  }

  get user() {
    return this.authService.user
  }

  getOwnExpenses(): Observable<Expense[]> {
    return this.db.collection(`users/${this.user.uid}/expenses`).snapshotChanges()
      .map(actions =>
        actions.map(a => {
          let expense = a.payload.doc.data() as Expense
          expense.id = a.payload.doc.id
          return expense
        }))
  }

  getOtherExpenses(): Observable<Expense[]> {
    return this.db.collection(`users/${this.user.uid}/otherExpenses`).snapshotChanges()
      .map(actions =>
        actions.map(a => {
          let expense = a.payload.doc.data() as Expense
          expense.id = a.payload.doc.id
          return expense
        }))
  }

  getAllExpenses(): Observable<Expense[]> {
    return Observable.combineLatest(this.getOtherExpenses(), this.getOwnExpenses())
      .map(([own, other]) => [...own, ...other])
  }

  getExpense(id: string, type: string): Observable<Expense> {
    return this.db.doc(`users/${this.user.uid}/${type}/${id}`).snapshotChanges()
      .map(doc => {
        var expense = doc.payload.data() as Expense
        expense.id = doc.payload.id;
        return expense;
      })
  }

  addExpense(expense: Expense, expenseUsers: string[]): Promise<any> {
    return this.db.collection(`users/${expense.creator}/expenses`).add(expense)
  }

  updateExpense(expense: Expense): Promise<any> {
    return this.db.doc(`users/${expense.creator}/expenses/${expense.id}`).set(expense)
  }

  deleteExpense(expense: Expense): Promise<any> {
    return this.db.doc(`users/${expense.creator}/expenses/${expense.id}`).delete()
  }

  getRelations(): Observable<Relation[]> {
    return this.db.collection(`users/${this.user.uid}/relations`).snapshotChanges()
      .map(actions => actions.map(a => a.payload.doc.data() as Relation))
  }

}
