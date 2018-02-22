import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Expense from '../../model/expense';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service'
import { MessagesService } from '../../services/messages.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses: Observable<Expense[]> = null;

  constructor(private expenseService: ExpenseService,
              private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.expenses = this.expenseService.getExpenses()
                    .catch((e: any) => Observable.throw(this.messagesService.error(e.message)));
  }

}
