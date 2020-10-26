import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'user-data',
  template: `
    <ul *ngIf="auth0.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>
  `
})
export class UserProfileComponent {
  constructor(public auth0: AuthService) {}
}
