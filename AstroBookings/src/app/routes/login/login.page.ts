import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from './login-form.component';
import { LoginService } from './login.service';

/**
 * Login page component
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginComponent, RouterLink],
  template: `
    <lab-login-form
      [(username)]="username"
      [(password)]="password"
      (sendLoginDto)="onSendLoginDto()" />
    <a routerLink="/register">Don't have an account? Register</a>
  `,
})
export default class LoginPage {
  loginService = inject(LoginService);

  // Writable signals

  /**
   * Username, default to 'admin'
   */
  readonly username: WritableSignal<string> = signal('admin');
  /**
   * Password, default to 'secret'
   */
  readonly password: WritableSignal<string> = signal('secret');

  // Computed signals

  /**
   * Login DTO, computed from the username and the password
   */
  private readonly loginDto = computed(() => ({
    username: this.username(),
    password: this.password(),
  }));

  // Effects

  /**
   * Effect to log the username and the password
   * - Runs when the username or the password changes
   */
  private readonly changeEffect = effect(() => {
    console.log(this.username(), this.password());
  });

  // Methods (event handlers)

  /**
   * Method to send the login DTO to the API
   */
  onSendLoginDto() {
    console.log('onSendLoginDto', this.loginDto());
    this.loginService.post(this.loginDto());
  }
}
