import { JsonPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'lab-control',
  standalone: true,
  imports: [UpperCasePipe, JsonPipe, FormsModule],
  template: `
    <div>
      <label [for]="controlName()">{{ caption() || controlName() | uppercase }}</label>

      <ng-content></ng-content>
      <pre>Hola</pre>
      <pre>{{ control().value | json }}</pre>
      @if (control().errors) {
      <small>{{ control().errors | json }}</small>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlBlock {
  controlName: InputSignal<string> = input.required<string>();
  caption: InputSignal<string | undefined> = input<string | undefined>();
  control: InputSignal<NgModel> = input.required<NgModel>();
  // BUG: control no está recibiendo el valor de ngModel
}
