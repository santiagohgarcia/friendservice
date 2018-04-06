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

  relations: Relation[];
  user = this.afAuth.auth.currentUser.providerData[0];

  constructor(private expenseService: ExpenseService,
    private messagesService: MessagesService,
    private afAuth: AngularFireAuth,
    private facebookService: FacebookService) { }

  ngOnInit() {
    this.expenseService.getRelations().subscribe(relations => this.relations = relations,
                                                 err => this.messagesService.error(err.message) )
    
  }

}
