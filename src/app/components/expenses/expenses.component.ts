import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { Expense } from '../../model/expense';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service'
import { MessagesService } from '../../services/messages.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { FacebookService } from '../../services/facebook.service';
import FacebookUser from '../../model/facebook-user';
import { UserInfo } from '@firebase/auth-types';
import { ExpenseUser } from '../../model/expense-user';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  friends: FacebookUser[] = [];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private expenseService: ExpenseService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService,
    private messageService: MessagesService) {
  }

  ngOnInit() {
    this.expenseService.getAllExpenses().subscribe(expenses => this.expenses = expenses,
                                                   err => this.messageService.error(err.message))
    
    this.facebookService.getFriends().subscribe(friends => this.friends = friends,
                                                err => this.messageService.error(err.message) )
  }


}
