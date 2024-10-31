import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lab-register-form',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  template: `
    <form #f="ngForm">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        #usernameInput="ngModel"
        [(ngModel)]="username"
        required
        minlength="3"
        maxlength="20"
        [attr.aria-invalid]="usernameInput.invalid" />
      @if (usernameInput.errors) {
      <small>{{ usernameInput.errors | json }}</small>
      }
      <label for="username">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        #emailInput="ngModel"
        [(ngModel)]="email"
        required
        minlength="3"
        maxlength="20"
        [attr.aria-invalid]="emailInput.invalid" />
      @if (emailInput.errors) {
      <small>{{ emailInput.errors | json }}</small>
      }
      <label for="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
        [(ngModel)]="password"
        #passwordInput="ngModel"
        required
        minlength="4"
        maxlength="20"
        [attr.aria-invalid]="passwordInput.invalid" />
      @if (passwordInput.errors) {
      <small>{{ passwordInput.errors | json }}</small>
      }
      <button type="submit" (click)="onRegisterClick()" [disabled]="f.invalid">Register</button>
    </form>
    <pre>{{ f.value | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  public username = '';
  public email = '';
  public password = '';

  public sendRegisterDto = output<unknown>();

  public onRegisterClick() {
    //console.log('Form Click', this.username);
    this.sendRegisterDto.emit({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }
}
