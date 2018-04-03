import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Relation } from '../../model/relation';
import { MessagesService } from '../../services/messages.service';
import { Observable } from 'rxjs/Observable';
import FacebookUser from '../../model/facebook-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { FacebookService } from '../../services/facebook.service';
import { Expense } from '../../model/expense';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  relations: Observable<Relation[]>;
  friends: FacebookUser[] = [];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private expenseService: ExpenseService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService) { }

  ngOnInit() {
    this.relations = this.expenseService.getRelations()
      .catch(e => {
        this.messagesService.error(e.message);
        return []
      })
    
    this.facebookService.getFriends()
      .then(friends => this.friends = friends)
      .catch(e => this.messagesService.error(e.message));
  }

 

}
