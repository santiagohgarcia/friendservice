import { Component, OnInit, Input } from '@angular/core';
import { Relation } from '../../../model/relation';
import FacebookUser from '../../../../../functions/src/model/facebook-user';
import { MessagesService } from '../../../services/messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../../../model/expense';
import { ExpenseUser } from '../../../model/expense-user';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SelectPaymentMethodDialogComponent } from '../../select-payment-method-dialog/select-payment-method-dialog.component';
import { ExpenseService } from '../../../services/expense.service';
import { FacebookService } from '../../../services/facebook.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  @Input() relation : Relation
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private afAuth: AngularFireAuth,
    private facebookService: FacebookService,
    private messagesService: MessagesService,
    private expenseService: ExpenseService,
    public dialog: MatDialog) { }

  ngOnInit() { 
  }

  get friends() {
    return this.facebookService.getFriends()
  }

  fbInfo(id: string){
    return this.facebookService.getFbInfo(id)
  }

  getUserDebt(expense: Expense): number {
    return expense.users.find( u => u.id === this.relation.userId ).individualAmount
  }

  pay(){
    let dialogRef = this.dialog.open(SelectPaymentMethodDialogComponent, {
      width: '300px',
      data: { user: this.relation.userId, expenses: this.relation.pendingExpenses  }
    });
  }

}
