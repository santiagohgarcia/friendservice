import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class MessagesService {

  constructor(private snackBar: MatSnackBar) { }

  error(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['error-snack-bar']
    });
  }
  
}
