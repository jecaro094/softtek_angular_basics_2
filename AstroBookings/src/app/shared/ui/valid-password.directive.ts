import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[labValidPassword]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidPasswordDirective, multi: true }],
})
export class ValidPasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    console.log('ValidPasswordDirective', control);
    const NO_ERROR = null;
    const password = control.value;
    const hasDigits = /\d/.test(password);
    if (!hasDigits) {
      control.setErrors({ noDigits: 'Password must have digits' });
      return { noDigits: 'Password must have digits' };
    }
    return NO_ERROR;
  }
}
