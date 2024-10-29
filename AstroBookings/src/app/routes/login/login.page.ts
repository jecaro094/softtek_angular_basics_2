import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lab-login',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  template: `
    <form #f="ngForm">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        [(ngModel)]="username"
        #usernameInput="ngModel"
        required
        minlength="6"
        maxlength="10"
        [attr.aria-invalid]="usernameInput.invalid" />
      @if(usernameInput.errors) {
      <small>{{ usernameInput.errors | json }}</small>
      }
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        [(ngModel)]="password"
        #passwordInput="ngModel"
        required
        minlength="4"
        maxlength="10"
        [attr.aria-invalid]="passwordInput.invalid" />
      @if(passwordInput.errors) {
      <small>{{ passwordInput.errors | json }}</small>
      }
      <button type="submit" (click)="onLoginClick()" [disabled]="f.invalid">Login</button>
    </form>
    <pre>{{ f.value | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  username = 'admin';
  password = 'secret';

  onLoginClick() {
    console.log('Login clicked', this.username, this.password);
  }
}
