import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private router: Router,
    private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    const $resizeEvent = Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .debounceTime(200)
    $resizeEvent.subscribe(data => this.handleWidth(data))
    this.handleWidth(document.documentElement.clientWidth)
  }

  handleWidth(size: number) {
    if (size > 900) {
      this.sidenav.mode = 'side'
      this.sidenav.open();
    } else {
      this.sidenav.mode = 'over'
      this.sidenav.close();
    }
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  navTo(path: string) {
    this.router.navigate([path])
  }

}

