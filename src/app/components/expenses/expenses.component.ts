import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../../model/expense';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service'
import { MessagesService } from '../../services/messages.service'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  
  ownExpenses: Observable<Expense[]>;
  otherEexpenses: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService,
              private messagesService: MessagesService,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.ownExpenses = this.expenseService.getOwnExpenses()
                    .catch(e => { this.messagesService.error(e.message);
                                  return []; });
  }

}
