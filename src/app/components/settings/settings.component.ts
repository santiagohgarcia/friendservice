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

  mercadoProcessing: boolean = false

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const code = params['code'];
      if (code) {
        this.mercadoProcessing = true
        this.userService.requestMercadoPagoData(code)
          .subscribe(_ => { console.log("mercado finished")
                            this.router.navigate(['/settings']) })
      }
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
    this.mercadoProcessing = event.checked;
    this.userService.acceptMercadoPago(event.checked)
  }

}
