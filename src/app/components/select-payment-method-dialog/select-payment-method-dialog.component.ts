import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../model/expense';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../services/user.service';
import User from '../../model/user';
import { AngularFirestore } from 'angularfire2/firestore';

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

  user: User

  constructor(
    public dialogRef: MatDialogRef<SelectPaymentMethodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportedData,
    private expenseService: ExpenseService,
    private db: AngularFirestore,
    private userService: UserService) {
    this.db.doc(`users/${this.data.user}`).snapshotChanges()
      .subscribe(actions => this.user = actions.payload.data() as User)
  }

  get me() {
    return this.userService.user
  }

  get isAcceptingMP() {
    if (this.user.mercadopago) {
      return this.user.mercadopago !== null
    } else {
      return false
    }
  }

  markAsPayed(): void {
    Promise.all(
      this.data.expenses.map(exp => {
        exp.users.find(u => u.id === this.me.id).payed = true
        return this.expenseService.updateExpense(exp as Expense)
      }))
      .then(_ => this.dialogRef.close())
  }

  payWithMercadoPago() {
    this.userService.requestMercadoPagoPayment(this.data.expenses)
      .subscribe( checkoutLink => window.location.href = checkoutLink.sandbox_init_point )
  }

}
