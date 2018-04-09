import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '@firebase/auth-types';
import * as firebase from 'firebase/app';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  user: UserInfo
  facebookToken: string
  provider : firebase.auth.FacebookAuthProvider
  persistance : string

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private messagesService: MessagesService,
    private router: Router) {
    
    this.provider = new firebase.auth.FacebookAuthProvider(); 
    this.provider.addScope('user_friends');
    
    this.persistance = firebase.auth.Auth.Persistence.LOCAL;

    this.afAuth.authState.subscribe(user => {
      if (user) {

        const uid = user.providerData[0].uid

        this.db.doc(`users/${uid}`).snapshotChanges()
            .subscribe( doc => {
                this.facebookToken = doc.payload.data().facebookToken 
                this.user = user.providerData[0]
              } )
      }else{
        this.router.navigate(['/login'])
      }
    });

    

  }

  logout() {
    this.afAuth.auth.signOut()
  }

  withFacebook() {
    this.afAuth.auth.setPersistence(this.persistance)
      .then(_ => this.afAuth.auth.signInWithPopup(this.provider)
        .then(c => {
          const userId = c.additionalUserInfo.profile.id
          const token  = c.credential.accessToken

          this.db.doc(`users/${userId}`).set({ facebookToken: token })
          
        }))
      .catch(e => this.messagesService.error(e.message))
  }

  authState(){
    return this.afAuth.authState
  }

  rememberMe(){
    this.persistance = firebase.auth.Auth.Persistence.LOCAL;
  }

  doNotRememberMe(){
    this.persistance = firebase.auth.Auth.Persistence.SESSION;
  }

}
