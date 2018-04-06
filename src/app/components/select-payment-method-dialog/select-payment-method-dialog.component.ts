import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../model/expense';
import { AngularFireAuth } from 'angularfire2/auth';

interface ImportedData {
  user: string,
  expenses: Expense[];
}


@Component({
  selector: 'app-select-payment-method-dialog',
  templateUrl: './select-payment-method-dialog.component.html',
  styleUrls: ['./select-payment-method-dialog.component.css']
})
export class SelectPaymentMethodDialogComponent {

  user = this.afAuth.auth.currentUser.providerData[0];
 
  constructor(
    public dialogRef: MatDialogRef<SelectPaymentMethodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportedData,
    private afAuth: AngularFireAuth,
    private expenseService: ExpenseService) { }

  markAsPayed(): void {
    Promise.all(
      this.data.expenses.map(exp =>{
      exp.users.find( u => u.id === this.user.uid ).payed = true
      return this.expenseService.updateExpense(exp as Expense) }))
        .then( _ => this.dialogRef.close())
  }

}
