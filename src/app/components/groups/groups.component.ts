import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { MessagesService } from '../../services/messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FacebookService } from '../../services/facebook.service';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../model/group';
import FacebookUser from '../../model/facebook-user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(private groupService: GroupsService,
    private messagesService: MessagesService,
    private facebookService: FacebookService,
    private authService: AuthService,
    private messageService: MessagesService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => this.groups = groups,
                                            err => this.messagesService.error(err.message))
  }

  get user(){
    return this.authService.user
  }

  get friends(){
    return this.facebookService.getFriends();
  }

  fbInfo(id: string): FacebookUser {
    return this.facebookService.getFbInfo(id)
  }

  getUsersName(group: Group) {
    return group.users
      .map(u => this.fbInfo(u).name)
      .join(", ")
  }

  delete(group: Group) {
    this.groupService.deleteGroup(group)
  }
  
}
