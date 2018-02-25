import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore) { }

  getUserRef(id: string = this.afAuth.auth.currentUser.providerData[0].providerId) {
    return this.db.doc(`users/${id}`).ref
  }
}
