import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, DialogPosition } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMeChecked = true;

  constructor(private authService: AuthService,
              private router: Router) {

    this.authService.authState().subscribe(user => {
      if (user) {
        this.router.navigateByUrl("/home");
      }
    });

  }

  ngOnInit() {
  }

  withFacebook() {
   this.authService.withFacebook()
  }

  rememberMe(evt) {
    if (this.rememberMeChecked) {
      this.authService.rememberMe()
    } else {
      this.authService.doNotRememberMe()
    }
  }

}
