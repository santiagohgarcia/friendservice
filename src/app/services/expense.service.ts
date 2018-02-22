import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import Expense from '../model/expense';
import { DocumentSnapshot } from '@firebase/firestore-types';

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

  addExpense(expense:Expense): Promise<any> {
    return this.db.collection<Expense>('expenses').add(expense);
  }

  updateExpense(expense:Expense): Promise<any> {
    return this.db.doc(`expenses/${expense.id}`).update(expense);
  }

  deleteExpense(expenseId:string){
    return this.db.doc(`expenses/${expenseId}`).delete();
  }

}
