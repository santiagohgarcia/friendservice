import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  get user() {
    return this.userService.user
  }

  get isAcceptingMP() {
    if (this.userService.user.mercadopago) {
      return this.userService.user.mercadopago !== null
    } else {
      return false
    }

  }

  acceptMP(event) {
    this.userService.acceptMercadoPago(event.checked)
  }

}
