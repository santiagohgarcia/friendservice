import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipList, MatSnackBar, MatAutocompleteSelectedEvent, MatChipEvent } from '@angular/material';
import FacebookUser from '../../model/facebook-user';
import { Observable } from 'rxjs/Observable';
import { InitialGroup, Group } from '../../model/group';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FacebookService } from '../../services/facebook.service';
import { MessagesService } from '../../services/messages.service';
import { GroupsService } from '../../services/groups.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent {

  @ViewChild('chipList') chiplist: MatChipList;

  loading: boolean = true;
  friends: FacebookUser[] = [];
  filteredFriends: Observable<FacebookUser[]>;
  formattedAmount: String = '';
  saveFunction;

  creator = this.afAuth.auth.currentUser.providerData[0];

  group: Group = InitialGroup(this.creator.uid);

  name = new FormControl('', [Validators.required]);
  friendsCtrl = new FormControl('');
  groupForm: FormGroup = new FormGroup({
    group: this.name,
    friendsCtrl: this.friendsCtrl
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private groupService: GroupsService,
    private facebookService: FacebookService,
    private messageService: MessagesService) {

  }

  ngAfterViewInit(): void {
    this.getGroup();
    this.getFriends();
  }

  async getGroup() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.group = await this.groupService.getGroup(id).first().toPromise()
        .catch(e => {
          this.messageService.error(e.message);
          return InitialGroup(this.creator.uid);
        });
      this.saveFunction = 'updateGroup';
    } else {
      this.saveFunction = 'addGroup';
    }
    this.loading = false;
  }

  async getFriends() {
    this.filteredFriends = this.friendsCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val)));
    this.facebookService.getFriends().subscribe(friends => this.friends = friends,
      err => this.messageService.error(err.message));
  }

  filter(val: string): FacebookUser[] {
    return this.friends.filter(f =>
      !this.group.users.find(userRef => userRef === f.id) &&
      f.name.toLowerCase().includes(val.toLowerCase()));
  }

  goBack(): void {
    this.router.navigate(['/groups']);
  }

  save(): void {
    if (this.groupForm.valid) {
      this.groupService[this.saveFunction](this.group)
        .then(_ => this.goBack())
        .catch(e => this.messageService.error(e.message));
    }
  }

  delete() {
    this.groupService.deleteGroup(this.group)
      .then(res => this.goBack())
      .catch(e => this.messageService.error(e.message));
  }


  friendSelection(event: MatAutocompleteSelectedEvent) {
    if (!this.group.users.find(user => user === event.option.value)) {
      this.group.users.push(event.option.value);
    }
  }

  removeFriend(event: MatChipEvent) {
    this.group.users = this.group.users.filter(user => user != event.chip.value)
  }

  getFbInfo(id: string): FacebookUser {
    if (id === this.creator.uid) {
      return {
        id: this.creator.uid,
        name: this.creator.displayName,
        picture: this.creator.photoURL
      } as FacebookUser
    } else {
      return this.friends.find(f => f.id === id);
    }
  }

}
