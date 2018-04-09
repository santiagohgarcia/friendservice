import {Component, ViewChild, OnInit} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,              
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private afAuth: AngularFireAuth){
 }
 
  ngOnInit() {
    this.redirect();
    this.iconRegistry.addSvgIcon('facebook_icon', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-logo.svg'));
  }

  async redirect(){
    let user = await this.afAuth.authState.first().toPromise();
    if(!user){
      this.router.navigate(['/login'])
    }
  }

}
