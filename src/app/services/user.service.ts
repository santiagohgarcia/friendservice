import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import User from '../model/user';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  user: User

  constructor(private authService: AuthService,
    private messagesService: MessagesService,
    private router: Router,
    private db: AngularFirestore) {

    this.db.doc<User>(`/users/${this.authService.user.uid}`).valueChanges()
      .subscribe(user => this.user = user)

  }

  acceptMercadoPago(value:boolean){
    if(value){
      //redirect to mercadopago authorization
    }else{
      this.db.doc<User>(`/users/${this.authService.user.uid}`).update({ mercadopago: null })
      .catch(err => this.messagesService.error(err.message))
    }

  }

}
