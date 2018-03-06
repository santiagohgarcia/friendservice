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

  user: Promise<UserInfo>

  constructor(private afAuth: AngularFireAuth,
    private http: HttpClient) {

    this.user = this.afAuth.authState.first().toPromise().then(user => {
      if (user) {
        return this.user = Promise.resolve(user.providerData[0])
      }
    });

  }


  async getFriends(): Promise<any> {
    const user = await this.user;
    return this.http.get('https://graph.facebook.com/v2.12/' + user.uid +
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

  async getFbInfo(id: string): Promise<FacebookUser> {
    const user = await this.user;
    if (id === user.uid) {
      return Promise.resolve({
        id: user.uid,
        name: user.displayName,
        picture: user.photoURL
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
