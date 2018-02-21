import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { MatSnackBar, MatAutocompleteTrigger, MatAutocompleteSelectedEvent, MatChipList, MatChipInput, MatChipEvent } from '@angular/material';
import Expense from '../../model/expense';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import User from '../../model/user' 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  @ViewChild('chipList') chiplist: MatChipList;

  loading: boolean = true;
  expense: Expense = {
    id: null, title: "",
    date: null,
    totalAmount: 0,
    users: []
  } as Expense;
  friends: User[] = [];
  filteredFriends: Observable<User[]>;
  expenseDoc: AngularFirestoreDocument<Expense>;
  formattedAmount: String = '';
  userDisplayName: String;
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
    private location: Location,
    public snackBar: MatSnackBar,
    private db: AngularFirestore,
    private decimalPipe: DecimalPipe,
    private afAuth: AngularFireAuth,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getExpense();
    this.getUserName();
    this.getFriends();

    this.filteredFriends = this.friendsCtrl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val)));
  }

  filter(val: string): User[] {
    return this.friends.filter(f =>
      !this.expense.users.find(user => user.id === f.id) &&
      f.name.toLowerCase().includes(val.toLowerCase()));
  }


  getFriends() {
    this.afAuth.authState.subscribe(u => {
      const uid : string[] = u.providerData.map(pd => pd.uid);
      this.expense.users.push({ id: uid[0],
                                name: this.userDisplayName
                              } as User);
      this.http.get('https://graph.facebook.com/v2.12/' + uid +
        '/friends?access_token=' +
        localStorage.getItem('facebookToken') +
        '&fields=cover,name&limit=10')
        .subscribe(fs =>
          this.friends = fs['data'].map(f => this.createUser(f.id, f.name, f.cover.source)))
    });
  }

  createUser(id, name, picture) {
    return {
      id: id,
      name: name,
      picture: picture
    } as User
  }

  getExpense(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expenseDoc = this.db.doc<Expense>(`expenses/${id}`);
      this.expenseDoc.ref.get().then(s => {
        var expense = s.data() as Expense //TODO: cambiar esto cuando se me ocurra una mejor implementacion
        expense.id = s.id;
        this.expense = expense;
        this.formattedAmount = this.decimalPipe.transform(this.expense.totalAmount, '1.2-2');
        this.loading = false;
      })
        .catch(e => this.openSnackBar(e.message));
      this.saveFunction = 'update'
    } else {
      this.loading = false;
      this.saveFunction = 'add';
    }
  }

  goBack(): void {
    this.router.navigate(['/expenses']);
  }

  save(): void {
    if (this.expenseForm.valid) {
      this[this.saveFunction]()
        .then(res => this.goBack())
        .catch(e => this.openSnackBar(e.message));
    }
  }

  add(): Promise<any> {
    return this.db.collection<Expense>('expenses').add(this.expense);
  }

  update(): Promise<any> {
    return this.expenseDoc.update(this.expense);
  }

  delete() {
    this.expenseDoc.delete().then(res => this.goBack())
      .catch(e => this.openSnackBar(e.message));
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

  getUserName() {
    return this.afAuth.authState.subscribe(u => this.userDisplayName = u.displayName);
  }

  friendSelection(event: MatAutocompleteSelectedEvent) {
    this.friendsCtrl.setValue("");
    this.expense.users.push({
      id: event.option.value,
      name: event.option.viewValue
    } as User)
  }

  removeFriend(event: MatChipEvent) {
    this.expense.users = this.expense.users.filter(u => u.id != event.chip.value)
  }
}

