import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import User from '../model/user';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { switchMap } from 'rxjs/operators';
import { Expense } from '../model/expense';
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
      window.location.href = "https://auth.mercadopago.com.ar/authorization?client_id=5813011101711907&response_type=code&platform_id=mp&redirect_uri=http://localhost:4200/settings/acceptMercadoPago";
    } else {
      this.db.doc<User>(`/users/${this.authService.user.uid}`).update({ mercadopago: null })
        .catch(err => this.messagesService.error(err.message))
    }
  }

  requestMercadoPagoData(authCode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('accept', 'application/json')
    const body = new HttpParams()
      .set('client_id','5813011101711907')
      .set('client_secret', 'tKV3lnpU9A7kB4QWb97c7xROHS9NskHM')
      .set('grant_type', 'authorization_code')
      .set('code', authCode)
      .set('redirect_uri', 'http://localhost:4200/settings/acceptMercadoPago')
    return this.http.post("https://api.mercadopago.com/oauth/token", body.toString(), { headers: headers })
      .pipe(switchMap(mpData => this.db.doc(`users/${this.authService.user.uid}`).update({ mercadopago: mpData })))
  }

  requestMercadoPagoPayment(expenses: Expense[]): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('accept', 'application/json')

    const items = expenses.map(e => {
      return {
        title: e.title,
        description: e.title,
        quantity: 1,
        unit_price: e.users.find(u => u.id === this.user.id).individualAmount,
        currency_id: 'ARS',
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif"
      }
    })

    const body = {
      items: items
    }

    return this.db.doc(`users/${expenses[0].creator}`).snapshotChanges()
      .map(actions => {
        console.log(actions.payload.data())
        return actions.payload.data().mercadopago.access_token
      })
      .pipe(
        switchMap(sellerAT => this.http.post<any>("https://api.mercadolibre.com/checkout/preferences?access_token=" + sellerAT, body, { headers: headers })),
      ) 
  }

}
