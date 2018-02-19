import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { MatDialog, DialogPosition } from '@angular/material';
 
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  rememberMeChecked = true;
  persistance = firebase.auth.Auth.Persistence.LOCAL;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public snackBar: MatSnackBar) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigateByUrl("/home");
      }
    });
    iconRegistry.addSvgIcon('facebook_icon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-logo.svg'));
  }

  ngOnInit() {
  }

  withFacebook() {
    this.afAuth.auth.setPersistence(this.persistance)
      .then(_ => this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        .catch(e => this.openSnackBar(e.message)))
      .catch(e => this.openSnackBar(e.message));
  }

  rememberMe(evt) {
    if(this.rememberMeChecked){
      this.persistance = firebase.auth.Auth.Persistence.LOCAL;
    }else{
      this.persistance = firebase.auth.Auth.Persistence.SESSION;
    }
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
