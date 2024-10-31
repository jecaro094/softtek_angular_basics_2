import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  post(loginDto: unknown) {
    console.log('LoginService', loginDto);
  }
}
