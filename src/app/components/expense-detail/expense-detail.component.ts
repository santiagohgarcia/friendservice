import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatChipList, MatChipEvent } from '@angular/material';
import Expense from '../../model/expense';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import User from '../../model/user'
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ExpenseService } from '../../services/expense.service'
import { FacebookService } from '../../services/facebook.service'
import { MessagesService } from '../../services/messages.service'
import 'rxjs/add/operator/first';
import { UserInfo } from 'firebase/app';

const initialExpense: Expense = {
  id: null,
  title: "",
  date: null,
  totalAmount: 0,
  users: []
} as Expense;

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  @ViewChild('chipList') chiplist: MatChipList;

  loading: boolean = true;
  expense: Expense = initialExpense;
  friends: User[] = [];
  filteredFriends: Observable<User[]>;

  userInfo: UserInfo;

  formattedAmount: String = '';
  saveFunction;

  title = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  totalAmount = new FormControl({ disabled: true }, [Validators.required])
  friendsCtrl = new FormControl('');
  expenseForm: FormGroup = new FormGroup({
    expense: this.title,
    date: this.date,
    totalAmount: this.totalAmount,
    friendsCtrl: this.friendsCtrl
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private db: AngularFirestore,
    private decimalPipe: DecimalPipe,
    private afAuth: AngularFireAuth,
    private expenseService: ExpenseService,
    private facebookService: FacebookService,
    private messageService: MessagesService) { }

  ngOnInit(): void {
    this.getExpense();
    this.getUserProviderInfo();
    this.getFriends();
  }

  filter(val: string): User[] {
    return this.friends.filter(f =>
      !this.expense.users.find(user => user.id === f.id) &&
      f.name.toLowerCase().includes(val.toLowerCase()));
  }

  async getExpense() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expense = await this.expenseService.getExpense(id).first().toPromise()
        .catch(e => {
          this.messageService.error(e.message);
          return initialExpense;
        });
      this.formattedAmount = this.decimalPipe.transform(this.expense.totalAmount, '1.2-2');
      this.saveFunction = 'updateExpense';
    } else {
      var providerData = await this.facebookService.getProviderData().first().toPromise();
      this.expense.users.push({ id: providerData[0].uid, name: providerData[0].displayName } as User)
      this.saveFunction = 'addExpense';
    }
    this.loading = false;
  }

  async getFriends() {
    this.friends = await this.facebookService.getFriends().catch(e => this.messageService.error(e.message));
    this.filteredFriends = this.friendsCtrl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val)));
  }

  async getUserProviderInfo() {
     this.userInfo = (await this.facebookService.getProviderData().first().toPromise())[0];
  }

  goBack(): void {
    this.router.navigate(['/expenses']);
  }

  save(): void {
    if (this.expenseForm.valid) {
      this.expenseService[this.saveFunction](this.expense)
        .then(res => this.goBack())
        .catch(e => this.messageService.error(e.message));
    }
  }

  delete(expenseId: string) {
    this.expenseService.deleteExpense(expenseId)
      .then(res => this.goBack())
      .catch(e => this.messageService.error(e.message));
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

  transformAmount(element) {
    try {
      this.formattedAmount = this.decimalPipe.transform(+this.formattedAmount.replace(/,/g, ''), '1.2-2')
      element.target.value = this.formattedAmount;
      this.expense.totalAmount = +this.formattedAmount.replace(/,/g, '');
      this.totalAmount.setErrors(null);
    } catch (error) {
      this.totalAmount.setErrors({ invalid: true });
    }
  }

  friendSelection(event: MatAutocompleteSelectedEvent) {
    this.friendsCtrl.setValue("");
    this.expense.users.push({ id: event.option.value, name: event.option.viewValue } as User)
  }

  removeFriend(event: MatChipEvent) {
    this.expense.users = this.expense.users.filter(u => u.id != event.chip.value)
  }
}

