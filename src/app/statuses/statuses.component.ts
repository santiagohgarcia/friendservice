import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import Status from '../status';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  statuses: Observable<Status[]> = null;

  constructor(private db: AngularFirestore,
    private router: Router,
    public snackBar: MatSnackBar) {
    this.statuses = db.collection('statuses').snapshotChanges()
      .map(actions => actions.map(a => {
        var status = a.payload.doc.data() as Status
        status.id = a.payload.doc.id;
     //   var dat = null;
     //   while(dat==null){};
        return status;
      }))
      .catch((e: any) => Observable.throw(this.openSnackBar(e.message)));
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
