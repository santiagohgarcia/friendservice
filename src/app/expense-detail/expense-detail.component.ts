import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import  Expense  from '../expense';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument  } from 'angularfire2/firestore';
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  loading: boolean = true;
  expense: Expense = {id:null,title:""} as Expense;
  expenseDoc : AngularFirestoreDocument<Expense>;
  saveFunction;
  title = new FormControl('', [Validators.required]);
  expenseForm: FormGroup = new FormGroup({
    expense: this.title
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public snackBar: MatSnackBar,
    private db: AngularFirestore) { }

    ngOnInit(): void {
      this.getExpense();
    } 
  
    getExpense(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
          this.expenseDoc = this.db.doc<Expense>(`expenses/${id}`);
          this.expenseDoc.ref.get().then(s => { var expense = s.data() as Expense //TODO: cambiar esto cuando se me ocurra una mejor implementacion
                                               expense.id  = s.id;
                                               this.expense = expense;
                                               this.loading = false; } )
                                  .catch(e => this.openSnackBar(e.message));
          this.saveFunction = 'update'
      } else {
        this.loading = false;
        this.saveFunction = 'add'
      }
    }
  
    goBack(): void {
      this.router.navigate(['/expenses']);
    }
  
    save(): void {
      if (this.expenseForm.valid) {
        this[this.saveFunction]()
          .then( res => this.goBack())
          .catch(e=>this.openSnackBar(e.message));        
      }
    }
  
    add(): Promise<any> {
      return this.db.collection<Expense>('expenses').add(this.expense);
    }
  
    update(): Promise<any> {
      return this.expenseDoc.update(this.expense);
    }
    
    delete() {
      this.expenseDoc.delete().then( res => this.goBack())
                             .catch(e=>this.openSnackBar(e.message));     
    }
  
    openSnackBar(message: string, action: string = "OK") {
      this.snackBar.open(message, action, {
        duration: 2000,
        extraClasses: ['error-snack-bar']
      });
    }
}
