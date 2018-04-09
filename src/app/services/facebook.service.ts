import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import FacebookUser from '../model/facebook-user';
import { Expense } from '../model/expense';
import 'rxjs/add/operator/elementAt';
import { UserInfo } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
@Injectable()
export class FacebookService {

  private friends: FacebookUser[]

  constructor(private afAuth: AngularFireAuth,
    private authService: AuthService,
    private http: HttpClient) {
    this.loadFriends()
  }

  get user() { return this.authService.user }

  get facebookToken() { return this.authService.facebookToken }

  private loadFriends(): void {
    this.http.get(`https://graph.facebook.com/v2.12/me/friends?
                   access_token=${this.facebookToken}&fields=picture,name`)
      .map(facebookFriend => facebookFriend['data']
        .map(data => this.createUser(data.id, data.name, data.picture.data.url)))
      .subscribe(friends => this.friends = friends,
                 err => console.log(err))
  }

  getFbInfo(id: string): FacebookUser {
    if (this.user.uid === id) {
      return {
        id: this.user.uid,
        name: this.user.displayName,
        picture: this.user.photoURL
      } as FacebookUser
    } else {
      return this.friends.find(u => u.id === id)
    }
  }

  getFriends(): FacebookUser[] {
    return this.friends
  }

  private createUser(id, name, picture) {
    return { id: id, name: name, picture: picture } as FacebookUser
  }

}
