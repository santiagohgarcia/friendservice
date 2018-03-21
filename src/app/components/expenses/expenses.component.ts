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
  expenses: Observable<Expense[]>;
  ownExpenses: Observable<Expense[]>;
  otherExpenses: Observable<Expense[]>;
  friends: FacebookUser[] = [];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private expenseService: ExpenseService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService,
    private messageService: MessagesService) {

  }

  ngOnInit() {

    this.expenses = Observable
      .combineLatest(this.expenseService.getOtherExpenses(),this.expenseService.getOwnExpenses())
      .map(([own, other]) => [...own, ...other]
                             .sort((e1, e2) =>  e2.date.getMilliseconds() - e1.date.getMilliseconds()))
      .catch(e => {
        this.messagesService.error(e.message);
        return [];
      })

    this.facebookService.getFriends()
      .then(friends => this.friends = friends)
      .catch(e => this.messageService.error(e.message));
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

  getCreatorUser(expense: Expense): ExpenseUser {
    return expense.users.find(u => u.id === expense.creator)
  }

  isMyExpense(expense: Expense): boolean {
    return expense.creator === this.user.uid
  }

  delete(expense: Expense) {
    this.expenseService.deleteExpense(expense)
  }

  getParticipantsName(expense: Expense): string {
    return expense.users
      .map(u => this.getFbInfo(u.id).name)
      .join(", ")
  }

  getMyDebt(expense: Expense): number {
    return expense.users.find(u => u.id === this.user.uid).individualAmount
  }

}
