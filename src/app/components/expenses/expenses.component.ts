import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

  ownExpenses: Observable<Expense[]>;
  otherEexpenses: Observable<Expense[]>;
  friends: FacebookUser[] = [];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private expenseService: ExpenseService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService,
    private messageService: MessagesService) {

  }

  ngOnInit() {
    this.ownExpenses = this.expenseService.getOwnExpenses()
      //.map(expenses => expenses.map(e => e.users = e.users.filter(u => u.id != this.user.uid )))
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

  getCreatorUser(expense: Expense): ExpenseUser{
    return expense.users.find( u => u.id === expense.creator)
  }

}
