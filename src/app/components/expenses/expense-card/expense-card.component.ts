import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../../model/expense';
import FacebookUser from '../../../../../functions/src/model/facebook-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExpenseService } from '../../../services/expense.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {

  @Input() expense : Expense;
  @Input() friends : FacebookUser[];

  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private expenseService: ExpenseService,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  getFbInfo(id: string): FacebookUser {
    if (id === this.user.uid) {
      return {
        id: this.user.uid,
        name: this.user.displayName,
        picture: this.user.photoURL
      } as FacebookUser
    } else {
      return this.friends.find(f => f.id === id);
    }
  }
  
  isMyExpense(expense: Expense): boolean {
    return expense.creator === this.user.uid
  }

  getMyDebt(expense: Expense): number {
    return expense.users.find(u => u.id === this.user.uid).individualAmount
  }

  get iPayed(): boolean{
    return this.expense.users.find(u => u.id === this.user.uid ).payed
  }

  getParticipantsName(expense: Expense): string {
    return expense.users
      .map(u => this.getFbInfo(u.id).name)
      .join(", ")
  }

  delete(expense: Expense) {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { title: 'Delete expense?', subtitle: 'Are you sure you want to delete the expense?' }
    });

    dialogRef.afterClosed().subscribe(result => result ? this.expenseService.deleteExpense(expense) : null );
    
  }

  get participantsDebt() {
    return this.expense.users.filter( u => u.id !== this.user.uid && !u.payed )
                             .map( u => u.individualAmount )
                             .reduce((a, b) => a + b, 0);
  }

  get participantsPayment() {
    return this.expense.users.filter( u => u.id !== this.user.uid && u.payed )
                             .map( u => u.individualAmount )
                             .reduce((a, b) => a + b, 0);
  }
}

