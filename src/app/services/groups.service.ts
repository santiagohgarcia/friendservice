import { Injectable } from '@angular/core';
import { UserInfo } from '@firebase/auth-types';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Group } from '../model/group';

@Injectable()
export class GroupsService {

  user: Promise<UserInfo>

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.first().toPromise().then(user => {
      if (user) {
        return this.user = Promise.resolve(user.providerData[0])
      }
    });
  }

  getGroups(): Observable<Group[]> {
    return Observable.fromPromise(this.user).switchMap(u =>
      this.db.collection(`users/${u.uid}/groups`).snapshotChanges()
        .map(actions =>
          actions.map(a => {
            let group = a.payload.doc.data() as Group
            group.id = a.payload.doc.id
            return group
          })))
  }

  getGroup(id: string): Observable<Group> {
    return Observable.fromPromise(this.user).switchMap(u =>
      this.db.doc(`users/${u.uid}/groups/${id}`).snapshotChanges()
        .map(doc => {
          var group = doc.payload.data() as Group
          group.id = doc.payload.id;
          return group;
        }))
  }
 
  addGroup(group: Group): Promise<any> {
    return this.db.collection(`users/${group.creator}/groups`).add(group)
  }

  updateGroup(group: Group): Promise<any> {
    return this.db.doc(`users/${group.creator}/groups/${group.id}`).set(group)
  }

  deleteGroup(group: Group) {
    return this.db.doc(`users/${group.creator}/groups/${group.id}`).delete()
  }

}
