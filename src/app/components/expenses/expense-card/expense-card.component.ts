import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../../model/expense';
import FacebookUser from '../../../../../functions/src/model/facebook-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExpenseService } from '../../../services/expense.service';

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
    private afAuth: AngularFireAuth) { }

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
    this.expenseService.deleteExpense(expense)
  }

}
