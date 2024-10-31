import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from './register-form.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RegisterFormComponent],
  template: ` <lab-register-form (sendRegisterDto)="onSendRegisterDto($event)" /> `,
})
export default class RegisterPage {
  public onSendRegisterDto(registerDto: unknown) {
    console.log('Page send', registerDto);
  }
}
