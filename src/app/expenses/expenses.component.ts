import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';
import Expense from '../expense';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses: Observable<Expense[]> = null;
  selectedExpenseId : string;

  constructor(private db: AngularFirestore,
    public snackBar: MatSnackBar,
    private router: Router) {
    this.expenses = db.collection('expenses').snapshotChanges()
      .map(actions => actions.map(a => {
        var expense = a.payload.doc.data() as Expense
        expense.id = a.payload.doc.id;
        return expense;
      }))
      .catch((e: any) => Observable.throw(this.openSnackBar(e.message)));
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
