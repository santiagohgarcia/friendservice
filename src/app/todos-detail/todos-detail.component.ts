import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import ToDo from '../todo';
import Status from '../status';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentReference, QueryDocumentSnapshot } from '@firebase/firestore-types';

@Component({
  selector: 'app-todos-detail',
  templateUrl: './todos-detail.component.html',
  styleUrls: ['./todos-detail.component.css']
})
export class TodosDetailComponent implements OnInit {
  loading: boolean = true;
  todo: ToDo = { id: null, title: "", description: "", status: null } as ToDo;
  statuses: Observable<QueryDocumentSnapshot[]>;
  todoDoc: AngularFirestoreDocument<ToDo>;
  saveFunction;
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required, Validators.nullValidator]);
  todoForm: FormGroup = new FormGroup({
    title: this.title,
    description: this.description,
    status: this.status
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public snackBar: MatSnackBar,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getStatuses();
    this.getTodo();
  }

  getTodo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoDoc = this.db.doc<ToDo>(`todos/${id}`);
      this.todoDoc.ref.get().then(t => {
        var todo = t.data() as ToDo //TODO: cambiar esto cuando se me ocurra una mejor implementacion
        todo.id = t.id;
        this.todo = todo;
        this.loading = false;
      }).catch(e => this.openSnackBar(e.message))
      this.saveFunction = 'update'
    } else {
      this.loading = false;
      this.saveFunction = 'add'
    }
  }

  goBack(): void {
    this.router.navigate(['/todos']);
  }

  getStatuses(): void {
    this.statuses = this.db.collection<Status>('statuses').snapshotChanges()
      .map(actions => actions.map(a => a.payload.doc))
      .catch((e: any) => Observable.throw(this.openSnackBar(e.message)));
  }

  save(): void {
    if (this.todoForm.valid) {
      this[this.saveFunction]()
        .then(res => this.goBack())
        .catch(e => this.openSnackBar(e.message));
    }
  }

  add(): Promise<any> {
    return this.db.collection<ToDo>('todos').add(this.todo);
  }

  update(): Promise<any> {
    return this.todoDoc.update(this.todo);
  }

  delete() {
    this.todoDoc.delete().then(res => this.goBack())
      .catch(e => this.openSnackBar(e.message));
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

  compareById(obj1, obj2) {
    return obj1.isEqual(obj2);
  }
}
