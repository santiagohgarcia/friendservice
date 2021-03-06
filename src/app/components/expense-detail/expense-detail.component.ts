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
import { ExpenseUser } from '../../model/expense-user';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../model/group';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent {

  @ViewChild('chipList') chiplist: MatChipList;

  loading: boolean = true;
  filteredFriends: FacebookUser[];
  groups: Group[];
  filteredGroups: Group[];
  formattedAmount: String = '';
  saveFunction;

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
    private groupService: GroupsService,
    private messageService: MessagesService,
    private authService: AuthService,
    public dialog: MatDialog) {

  }

  ngAfterViewInit(): void {
    this.getExpense();
    this.getFriends();
    this.getGroups();
  }

  get creator(){
    return this.authService.user
  }

  async getExpense() {
    const id = this.route.snapshot.paramMap.get('id');
    const expType = this.route.snapshot.paramMap.get('expType');
    if (id) {
      this.expense = await this.expenseService.getExpense(id, expType).first().toPromise()
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
    this.friendsCtrl.valueChanges.subscribe(val => this.filterFriends(val))
  }

  getGroups() {
    this.friendsCtrl.valueChanges.subscribe(val => this.filterGroups(val))
    this.groupService.getGroups().subscribe(groups => { 
      this.groups = groups
      this.filteredGroups = groups });
  }

  filterFriends(val: string) {
    this.filteredFriends = this.friends.filter(f =>
      !this.expense.users.find(userRef => userRef.id === f.id) &&
      f.name.toLowerCase().includes(val.toLowerCase()));
  }

  filterGroups(val: string): void {
    this.filteredGroups = this.groups.filter(g => g.name.toLowerCase().includes(val.toLowerCase()))
  }

  goBack(): void {
    this.router.navigate(['/expenses']);
  }

  save(): void {
    if (this.expenseForm.valid) {
      this.updateIndividualAmounts()
      this.expenseService[this.saveFunction](this.expense)
        .then(_ => this.goBack())
        .catch(e => this.messageService.error(e.message));
    }
  }

  delete() {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { title: 'Delete expense?', subtitle: 'Are you sure you want to delete the expense?' }
    });

    dialogRef.afterClosed().subscribe(result => result ? 
      this.expenseService.deleteExpense(this.expense)
      .then(res => this.goBack())
      .catch(e => this.messageService.error(e.message)) : null );
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

  friendOrGroupSelection(event: MatAutocompleteSelectedEvent) {
    switch (event.option.group.label) {
      case 'Groups': {
        this.groups.find(g => g.id === event.option.value)
          .users.forEach(u => this.addFriend(u))
        break;
      }
      case 'Friends': {
        this.addFriend(event.option.value)
        break;
      }
    }
    this.friendsCtrl.setValue('');
  }

  addFriend(friendId: string) {
    if (!this.expense.users.find(user => user.id === friendId)) {
      this.expense.users.push({
        id: friendId,
        payed: false
      } as ExpenseUser);
    }
  }
  removeFriend(userToRemove: ExpenseUser) {
    this.expense.users = this.expense.users.filter(user => user.id != userToRemove.id)
  }

  getFbInfo(id: string): FacebookUser {
    if (id === this.creator.uid) {
      return {
        id: this.creator.uid,
        name: this.creator.displayName,
        picture: this.creator.photoURL
      } as FacebookUser
    } else {
      return this.friends.find(f => f.id === id);
    }
  }

  updateIndividualAmounts() {
    this.expense.users.forEach(u =>
      u.individualAmount = this.expense.totalAmount / this.expense.users.length
    )
  }

  getUsersName(group: Group) {
    return group.users
      .map(u => this.getFbInfo(u).name)
      .join(", ")
  }

  get friends() {
    return this.facebookService.getFriends()
  }
}

