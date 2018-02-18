import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { MatDialog, DialogPosition } from '@angular/material';
import { RegisterComponent } from './components/register.component';
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

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])
  registerForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });


  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigateByUrl("/home");
      }
    });
    iconRegistry.addSvgIcon('facebook_icon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-logo.svg'));
    iconRegistry.addSvgIcon('google_icon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-plus.svg'));
  }

  ngOnInit() {
  }

  withGoogle() {
    this.afAuth.auth.setPersistence(this.persistance)
      .then(_ => this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .catch(e => this.openSnackBar(e.message)))
      .catch(e => this.openSnackBar(e.message));
  }

  withFacebook() {
    this.afAuth.auth.setPersistence(this.persistance)
      .then(_ => this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        .catch(e => this.openSnackBar(e.message)))
      .catch(e => this.openSnackBar(e.message));
  }

  withEmail() {
    if (this.registerForm.valid) {
      this.afAuth.auth.setPersistence(this.persistance)
        .then(_ => this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
          .catch(e => this.openSnackBar(e.message)))
        .catch(e => this.openSnackBar(e.message));
    }
  }

  rememberMe(evt) {
    if(this.rememberMeChecked){
      this.persistance = firebase.auth.Auth.Persistence.LOCAL;
    }else{
      this.persistance = firebase.auth.Auth.Persistence.SESSION;
    }
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
