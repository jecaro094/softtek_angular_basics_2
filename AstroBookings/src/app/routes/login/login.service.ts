import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto } from './login.dto';

@Injectable({ providedIn: 'root' })
export class LoginService {
  http = inject(HttpClient);
  readonly URL = 'http://localhost:3000/api/login?status=200';

  post(loginDto: LoginDto) {
    this.http
      .post<{ username: string; password: string }>(this.URL, loginDto)
      .subscribe((res) => console.log('Response', res));
    console.log('LoginService Payload', loginDto);
  }
}

export class LoginServiceBeta {
  post(loginDto: LoginDto) {
    console.log('🚨 LoginServiceBeta', loginDto);
  }
}
