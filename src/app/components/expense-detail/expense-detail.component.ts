import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatChipList, MatChipEvent } from '@angular/material';
import { Expense, InitialExpense } from '../../model/expense';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import FacebookUser from '../../model/facebook-user'
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ExpenseService } from '../../services/expense.service'
import { FacebookService } from '../../services/facebook.service'
import { MessagesService } from '../../services/messages.service'
import 'rxjs/add/operator/first';
import { UserInfo } from 'firebase/app';
import { Reference } from '../../model/reference';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent {

  @ViewChild('chipList') chiplist: MatChipList;

  loading: boolean = true;
  friends: FacebookUser[] = [];
  filteredFriends: Observable<FacebookUser[]>;

  formattedAmount: String = '';
  saveFunction;

  creator = this.afAuth.auth.currentUser.providerData[0];

  expense: Expense = InitialExpense(this.creator.uid);

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
    private messageService: MessagesService) {
      
     }

  ngAfterViewInit(): void {
    this.getExpense();
    this.getFriends();
  }

  async getExpense() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expense = await this.expenseService.getExpense(id).first().toPromise()
        .catch(e => {
          this.messageService.error(e.message);
          return InitialExpense(this.creator.uid);
        });
      this.formattedAmount = this.decimalPipe.transform(this.expense.totalAmount, '1.2-2');
      this.saveFunction = 'updateExpense';
    } else {
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

  filter(val: string): FacebookUser[] {
    return this.friends.filter(f =>
      !this.expense.users.find(userRef => userRef.ref === f.id) &&
      f.name.toLowerCase().includes(val.toLowerCase()));
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
    if(!this.expense.users.find(userRef => userRef.ref ===  event.option.value)){
      this.expense.users.push({ ref: event.option.value } as Reference);
    }
  }

  removeFriend(event: MatChipEvent) {
    this.expense.users = this.expense.users.filter(userRef => userRef.ref != event.chip.value)
  }

  getFbInfo(id: string): FacebookUser {
    return this.friends.find( f => f.id === id );
  }
}

 