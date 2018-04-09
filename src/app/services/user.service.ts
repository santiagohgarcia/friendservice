import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import User from '../model/user';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  user: User

  constructor(private authService: AuthService,
    private messagesService: MessagesService,
    private router: Router,
    private db: AngularFirestore,
    private http: HttpClient,
    private sanitizer: DomSanitizer) {

    this.db.doc<User>(`/users/${this.authService.user.uid}`).valueChanges()
      .subscribe(user => this.user = user)

  }

  acceptMercadoPago(value: boolean) {
    if (value) {
      const url = this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://auth.mercadopago.com.br/authorization?client_id=5813011101711907&response_type=code&platform_id=mp&redirect_uri=http://localhost:4200/settings/acceptMercadoPago"
      );
      window.location.href = "https://auth.mercadopago.com.br/authorization?client_id=5813011101711907&response_type=code&platform_id=mp&redirect_uri=http://localhost:4200/settings/acceptMercadoPago";
    } else {
      this.db.doc<User>(`/users/${this.authService.user.uid}`).update({ mercadopago: null })
        .catch(err => this.messagesService.error(err.message))
    }
  }

  requestMercadoPagoData(authCode:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    });
    this.http.post(
      "https://api.mercadopago.com/oauth/token",
      {
        'client_secret': 'tKV3lnpU9A7kB4QWb97c7xROHS9NskHM',
        'grant_type': 'authorization_code',
        'code': authCode
      },
      null //headers
    ).subscribe(mpData => console.log(mpData))
  }

}
