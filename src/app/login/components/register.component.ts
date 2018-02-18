import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register-dialog',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])
  repeatPassword = new FormControl('', [Validators.required])
  registerForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
    repeatPassword: this.repeatPassword
  }, this.validatePassword );

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    private afAuth: AngularFireAuth,
    private router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  onRegister() {
    if (this.registerForm.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
        .then(_ => this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
          .then(_ => {
            this.dialogRef.close();
            this.router.navigate(['/home']);
          })
          .catch(e => this.openSnackBar(e.message)))
        .catch(e => this.openSnackBar(e.message));
    }
  }

  validatePassword(c: AbstractControl): ValidationErrors {
    var error = { passwordNoMatch: true };
    var password = c.get('password');
    var repeat = c.get('repeatPassword');
    if (password.value != repeat.value){
     repeat.setErrors(error)
     return { passwordNoMatch: true };
    }else{
      repeat.setErrors(null);
      return null;
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }

}
