import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import  Status  from '../status';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument  } from 'angularfire2/firestore';

@Component({
  selector: 'app-statuses-detail',
  templateUrl: './statuses-detail.component.html',
  styleUrls: ['./statuses-detail.component.css']
})
export class StatusesDetailComponent implements OnInit {

  loading: boolean = true;
  status: Status = {id:null,description:""} as Status;
  statusDoc : AngularFirestoreDocument<Status>;
  saveFunction;
  description = new FormControl('', [Validators.required]);
  statusForm: FormGroup = new FormGroup({
    description: this.description
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public snackBar: MatSnackBar,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getStatus();
  } 

  getStatus(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.statusDoc = this.db.doc<Status>(`statuses/${id}`);
        this.statusDoc.ref.get().then(s => { var status = s.data() as Status //TODO: cambiar esto cuando se me ocurra una mejor implementacion
                                             status.id  = s.id;
                                             this.status = status;
                                             this.loading = false; } )
                                .catch(e => this.openSnackBar(e.message));
        this.saveFunction = 'update'
    } else {
      this.loading = false;
      this.saveFunction = 'add'
    }
  }

  goBack(): void {
    this.router.navigate(['/statuses']);
  }

  save(): void {
    if (this.statusForm.valid) {
      this[this.saveFunction]()
        .then( res => this.goBack())
        .catch(e=>this.openSnackBar(e.message));        
    }
  }

  add(): Promise<any> {
    return this.db.collection<Status>('statuses').add(this.status);
  }

  update(): Promise<any> {
    return this.statusDoc.update(this.status);
  }
  
  delete() {
    this.statusDoc.delete().then( res => this.goBack())
                           .catch(e=>this.openSnackBar(e.message));     
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
