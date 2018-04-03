import { Component, OnInit, Input } from '@angular/core';
import { Relation } from '../../../model/relation';
import FacebookUser from '../../../../../functions/src/model/facebook-user';
import { MessagesService } from '../../../services/messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../../../model/expense';
import { ExpenseUser } from '../../../model/expense-user';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  @Input() relation : Relation
  @Input() friends : FacebookUser[]
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() { 
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

  getUserDebt(expense: Expense,userId: string): ExpenseUser{
    return expense.users.find( u => u.id === userId )
  }

}
