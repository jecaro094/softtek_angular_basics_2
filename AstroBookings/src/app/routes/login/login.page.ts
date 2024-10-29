import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lab-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #f="ngForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" [(ngModel)]="username" />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" [(ngModel)]="password" />
      <button type="submit">Login</button>
    </form>
    <pre>{{ username }}:{{ password }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  username = 'admin';
  password = 'secret';
}
