import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import FacebookUser from '../model/facebook-user';
import { Expense } from '../model/expense';
import 'rxjs/add/operator/elementAt';
import { UserInfo } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable()
export class FacebookService {

  user: UserInfo

  constructor(private afAuth: AngularFireAuth,
    private http: HttpClient) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.providerData[0]
      }
    });

  }


  async getFriends(): Promise<any> {
    return this.http.get('https://graph.facebook.com/v2.12/' + this.user.uid +
      '/friends?access_token=' +
      localStorage.getItem('facebookToken') +
      '&fields=cover,name&limit=10')
      .map(facebookFriend => facebookFriend['data']
        .map(data => this.createUser(data.id, data.name, data.cover.source)))
      .first().toPromise();
  }

  private createUser(id, name, picture) {
    return { id: id, name: name, picture: picture } as FacebookUser
  }

  getFbInfo(id: string): Promise<FacebookUser> {
    if (id === this.user.uid) {
      return Promise.resolve({
        id: this.user.uid,
        name: this.user.displayName,
        picture: this.user.photoURL
      } as FacebookUser)
    } else {
      return this.http.get('https://graph.facebook.com/v2.12/' + id +
        '?access_token=' +
        localStorage.getItem('facebookToken') +
        '&fields=cover,name')
        .map(facebookFriend => facebookFriend['data']
          .map(data => this.createUser(data.id, data.name, data.cover.source)))
        .first().toPromise()
    }
  }



}
