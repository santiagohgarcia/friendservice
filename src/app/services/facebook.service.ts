import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import User from '../model/user';
import { Expense, InitialExpense } from '../model/expense';
import  FacebookFriend from '../model/facebook-friend'
import 'rxjs/add/operator/elementAt';
import { UserInfo } from 'firebase/app';
import { ProviderData } from '@angular/core/src/view';


@Injectable()
export class FacebookService {

  constructor(private afAuth: AngularFireAuth,
    private http: HttpClient) { }

  getUserData(id:string = 'me'): Observable<FacebookFriend> {
      return this.http.get('https://graph.facebook.com/v2.12/' + id +
                           '?access_token=' +
                            localStorage.getItem('facebookToken') +
                            '&fields=picture,name')
          .map( (user: any) => this.createFacebookFriend(user.id, user.name, user.picture.data.url) )
  }

 async getFriends() : Promise<any> {
      return this.http.get('https://graph.facebook.com/v2.12/me' +
        '/friends?access_token=' +
        localStorage.getItem('facebookToken') +
        '&fields=picture,name&limit=10')
        .map(facebookFriend => facebookFriend['data']
        .map( data => this.createFacebookFriend(data.id, data.name, data.picture.data.url)))
        .first().toPromise();
  } 

 private createFacebookFriend(id, name, picture) {
    return { id: id, name: name, picture: picture } as FacebookFriend
  }

}
