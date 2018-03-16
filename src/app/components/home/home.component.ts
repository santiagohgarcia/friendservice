import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  navTo(event){
    switch(event.index) { 
      case 0: { this.router.navigate(['/expenses']) }
      case 1: { this.router.navigate(['/persons']) }
      case 2: { this.router.navigate(['/groups']) }
    }
  }
}

