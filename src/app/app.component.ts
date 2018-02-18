import {Component, ViewChild, OnInit} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private afAuth: AngularFireAuth){ }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        // User is not logged in
        this.router.navigateByUrl("/login");
      }
    });
  }

}
