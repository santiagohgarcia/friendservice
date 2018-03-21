import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { MessagesService } from '../../services/messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FacebookService } from '../../services/facebook.service';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../model/group';
import FacebookUser from '../../model/facebook-user';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Observable<Group[]>;
  friends: FacebookUser[] = [];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private groupService: GroupsService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService,
    private messageService: MessagesService) {
  }

  ngOnInit() {
    this.groups = this.groupService.getGroups()
      .catch(e => {
        this.messagesService.error(e.message);
        return [];
      })

    this.facebookService.getFriends()
      .then(friends => this.friends = friends)
      .catch(e => this.messageService.error(e.message));
  }


  getFbInfo(id: string): FacebookUser {
    if (id === this.user.uid) {
      return {
        id: this.user.uid,
        name: this.user.displayName,
        picture: this.user.photoURL
      } as FacebookUser
    } else {
      return this.friends.find(f => f.id === id);
    }
  }

  getUsersName(group: Group) {
    return group.users
      .map(u => this.getFbInfo(u).name)
      .join(", ")
  }

  delete(group: Group) {
    this.groupService.deleteGroup(group)
  }
  
}
