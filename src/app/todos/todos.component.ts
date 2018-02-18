import { Component, ViewChild, OnInit } from '@angular/core';
import Todo from '../todo';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

const doneStatus = "5a7a5b4249f3c32c884a8809";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos: Observable<Todo[]>

  constructor(private db: AngularFirestore,
              public router: Router,
              public snackBar: MatSnackBar) {
      this.todos = db.collection('todos').snapshotChanges()// TODO: REPLACE FOR COMMON IMPLEMENTATION 
                   .map(actions => actions.map(a => { var todo = a.payload.doc.data() as Todo //TODO: cambiar esto cuando se me ocurra una mejor implementacion
                                                      todo.id  = a.payload.doc.id;
                                                      return todo;  } ))
                   .catch((e: any)=> Observable.throw(this.openSnackBar(e.message)));
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
