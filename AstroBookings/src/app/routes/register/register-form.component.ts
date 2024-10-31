import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lab-register-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, FormsModule],
  template: `
    <form #form="ngForm">
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
      <label for="repeatPassword">Repeat Password</label>
      <input
        type="text"
        id="repeatPassword"
        name="repeatPassword"
        [(ngModel)]="repeatPassword"
        #repeatPasswordInput="ngModel"
        [attr.aria-invalid]="areDifferentPasswords()" />
      @if (areDifferentPasswords()) {
      <small>Passwords are different</small>
      }
      <button
        type="submit"
        (click)="onRegisterClick()"
        [disabled]="form.invalid || areDifferentPasswords()">
        Register
      </button>
    </form>
    <pre>{{ form.value | json }}</pre>
    <pre>{{ times }}</pre>
  `,
})
export class RegisterFormComponent {
  public username = '';
  public email = '';
  public password = signal<string>('');

  public repeatPassword = signal<string>('');

  public sendRegisterDto = output<unknown>();
  public times = 0;

  // public areDifferentPasswords() {
  //   //console.log('Password checking');
  //   this.times++;
  //   return this.password !== this.repeatPassword;
  // }

  public areDifferentPasswords = computed(() => {
    this.times++;
    return this.password() !== this.repeatPassword();
  });

  public onRegisterClick() {
    //console.log('Form Click', this.username);
    this.sendRegisterDto.emit({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }
}
