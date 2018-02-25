import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatChipList, MatChipEvent } from '@angular/material';
import { Expense, InitialExpense } from '../../model/expense';
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
import { UserInfo, firestore } from 'firebase/app';
import { DocumentReference } from '@firebase/firestore-types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent {

  @ViewChild('chipList') chiplist: MatChipList;

  loading: boolean = true;
  expense: Expense = InitialExpense();
  friends: User[] = [];
  filteredFriends: Observable<User[]>;

  user: DocumentReference;

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
    private messageService: MessagesService,
    private userService: UserService) {

  }

  ngAfterViewInit(): void {
    //this.user = this.userService.getUserRef();
    this.getExpense();
    this.getFriends();
  }

  async getExpense() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expense = await this.expenseService.getExpense(id).first().toPromise()
        .catch(e => {
          this.messageService.error(e.message);
          return InitialExpense();
        });
      this.formattedAmount = this.decimalPipe.transform(this.expense.totalAmount, '1.2-2');
      this.saveFunction = 'updateExpense';
    } else {
      this.expense.creatorId = this.afAuth.auth.currentUser.providerData[0].uid;
      this.expense.expenseUsersIds.push(this.expense.creatorId)
      this.saveFunction = 'addExpense';
    }
    this.loading = false;
  }

  async getFriends() {
    this.filteredFriends = this.friendsCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val)));
    this.friends = await this.facebookService.getFriends().catch(e => this.messageService.error(e.message));
  }

  filter(val: string): User[] {
    return this.friends.filter(async f =>
      !(this.expense.expenseUsersIds.find(id => f.id === id)) &&
      f.id.toLowerCase().includes(val.toLowerCase()));
  }

  goBack(): void {
    this.router.navigate(['/expenses']);
  }

  save(): void {
    if (this.expenseForm.valid) {
      this.expenseService[this.saveFunction](this.expense)
        .then(_ => this.goBack())
        .catch(e => this.messageService.error(e.message));
    }
  }

  delete() {
    this.expenseService.deleteExpense(this.expense.id)
      .then(res => this.goBack())
      .catch(e => this.messageService.error(e.message));
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
    if (!this.expense.expenseUsersIds.find(id => event.option.value === id)) {
      this.expense.expenseUsersIds.push(event.option.value);
    }
  }

  removeFriend(event: MatChipEvent) {
    this.expense.expenseUsersIds = this.expense.expenseUsersIds.filter(id => id!=event.chip.value)
  }
}

