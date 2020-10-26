import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kinnect Careers';
  passUserIsLogged: boolean;

  connectLoggedStatusToSidenav($userIsLogged: boolean) {
    this.passUserIsLogged = $userIsLogged;
  }
  connectLoggedStatus($userIsLogged: boolean) {
    this.passUserIsLogged = $userIsLogged;
  }
}
