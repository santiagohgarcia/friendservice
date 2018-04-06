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

  groups: Group[] = [];
  friends: FacebookUser[] = [];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private groupService: GroupsService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService,
    private messageService: MessagesService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => this.groups = groups,
                                            err => this.messagesService.error(err.message))

    this.facebookService.getFriends().subscribe(friends => this.friends = friends,
                                                err => this.messageService.error(err.message));
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
