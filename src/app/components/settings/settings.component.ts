import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const code = params['code'];
    });
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
