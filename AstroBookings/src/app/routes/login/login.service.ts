import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { LoginDto, UserToken } from './login.dto';

/**
 * Login service to post a login DTO to the login API
 */
@Injectable({ providedIn: 'root' })
export class LoginService {
  /**
   * Injected HttpClient to make requests
   */
  http = inject(HttpClient);
  /**
   * URL to the login API (should come from an environment variable)
   */
  readonly URL = `${environment.apiUrl}/login?status=200`;

  /**
   * Post a login DTO to the login API
   * @param loginDto Login DTO
   */
  post(loginDto: LoginDto) {
    this.http.post<UserToken>(this.URL, loginDto).subscribe((res) => console.log('UserToken', res));
    console.log('Payload', loginDto);
  }
}

export class LoginServiceBeta {
  post(loginDto: LoginDto) {
    console.log('🚨 LoginServiceBeta', loginDto);
  }
}
