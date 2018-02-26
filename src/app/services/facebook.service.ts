import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import FacebookUser from '../model/facebook-user';
import { Expense } from '../model/expense';
import 'rxjs/add/operator/elementAt';
import { UserInfo } from 'firebase/app';
@Injectable()
export class FacebookService {

  constructor(private afAuth: AngularFireAuth,
    private http: HttpClient) { }

  getProviderData() {
   return this.afAuth.authState
   .map(pd => pd.providerData[0] )
  }

 async getFriends() : Promise<any> {
      var providerData: UserInfo = await this.getProviderData().first().toPromise();
      return this.http.get('https://graph.facebook.com/v2.12/' + providerData.uid +
        '/friends?access_token=' +
        localStorage.getItem('facebookToken') +
        '&fields=cover,name&limit=10')
        .map(facebookFriend => facebookFriend['data']
        .map( data => this.createUser(data.id, data.name, data.cover.source)))
        .first().toPromise();
  } 

 private createUser(id, name, picture) {
    return { id: id, name: name, picture: picture } as FacebookUser
  }

}
