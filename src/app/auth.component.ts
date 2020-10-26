import { Component, Inject } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';

import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'auth',
  template: `
  <li *ngIf="auth0.isAuthenticated$ |async; else loggedOut">
      <a (click)="auth0.logout({ returnTo: document.location.origin })">
      Logout
      </a>
  </li>
  <ng-template #loggedOut>
    <li>
      <a (click)="auth0.loginWithRedirect()">
        Login
      </a>
    </li>
  </ng-template>
  `,
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document,
    public auth0: AuthService
  ){}
}
