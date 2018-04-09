import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../../model/expense';
import FacebookUser from '../../../../../functions/src/model/facebook-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx'
import { ExpenseService } from '../../../services/expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import { SelectPaymentMethodDialogComponent } from '../../select-payment-method-dialog/select-payment-method-dialog.component';
import { FacebookService } from '../../../services/facebook.service';
import { MessagesService } from '../../../services/messages.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {

  @Input() expense: Expense;

  constructor(private expenseService: ExpenseService,
    private facebookService: FacebookService,
    private authService: AuthService,
    private messagesService: MessagesService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  get user(){
    return this.authService.user
  }

  get isMyExpense(): boolean {
    return this.expense.creator === this.user.uid
  }

  get myDebt(): number {
    return this.expense.users.find(u => u.id === this.user.uid).individualAmount
  }

  get iPayed(): boolean {
    return this.expense.users.find(u => u.id === this.user.uid).payed
  }

  get participantsNames(): string {
    return this.expense.users
      .map(u => this.fbInfo(u.id).name)
      .join(", ")
  }

  get participantsDebtAmount(): number {
    return this.expense.users.filter(u => u.id !== this.user.uid && !u.payed)
      .map(u => u.individualAmount)
      .reduce((a, b) => a + b, 0);
  }

  get participantsPaymentAmount(): number {
    return this.expense.users.filter(u => u.id !== this.user.uid && u.payed)
      .map(u => u.individualAmount)
      .reduce((a, b) => a + b, 0);
  }

  get numberOfUsers(): number {
    return this.expense.users.length
  }

  get friends() {
    return this.facebookService.getFriends()
  }

  get myFbInfo(): FacebookUser {
    return this.facebookService.getFbInfo(this.user.uid)
  }

  fbInfo(id: string): FacebookUser {
    return this.facebookService.getFbInfo(id)
  }

  pay() {
    this.dialog.open(SelectPaymentMethodDialogComponent, {
      width: '300px',
      data: { expenses: [this.expense] }
    });
  }

  delete(expense: Expense) {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { title: 'Delete expense?', subtitle: 'Are you sure you want to delete the expense?' }
    });
    dialogRef.afterClosed().subscribe(result => result ? this.expenseService.deleteExpense(this.expense) : null);
  }
}

