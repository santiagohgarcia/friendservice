import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    const splitUrl = this.router.url.split('/');
    switch (splitUrl[splitUrl.length-1]) {
      case 'expenses': {
          this.tabGroup.selectedIndex = 0;
          break;
      }
      case 'persons': {
        this.tabGroup.selectedIndex = 1;
        break;
      }
      case 'groups': {
        this.tabGroup.selectedIndex = 2;
        break;
      }
    }
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  navTo(tabChanged) {
    switch (tabChanged.index) {
      case 0: {
          this.router.navigate(['/expenses'])
          break;
      }
      case 1: {
        this.router.navigate(['/persons'])
        break;
      }
      case 2: {
        this.router.navigate(['/groups'])
        break;
      }
    }
  }

}

