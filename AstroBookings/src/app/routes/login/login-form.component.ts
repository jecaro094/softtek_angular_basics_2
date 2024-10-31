import { JsonPipe } from '@angular/common';
import { Component, model, ModelSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Presenter form component
 */
@Component({
  selector: 'lab-login-form',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './login-form.component.html',
  styles: [],
})
export class LoginComponent {
  // Model signals (writable input and output)

  /**
   * Username, model signal
   * - Comes from the parent
   * - Bound to the input field
   * - Sends to the parent
   */
  readonly username: ModelSignal<string> = model<string>('');
  /**
   * Password, model signal
   * - Comes from the parent
   * - Bound to the input field
   * - Sends to the parent
   */
  readonly password: ModelSignal<string> = model<string>('');

  // Output event (sent to parent)

  /**
   * Send login DTO event, sent to the parent
   * - Currently send no value
   * - The value is at the model properties
   * - Can be rewritten to send a computed DTO
   */
  readonly sendLoginDto = output<void>();
}

// Forms, validation, etc.
// - Use Template Driven Forms
// - Use ngModel
// - Use container/presenter pattern
// - Use model signal to communicate with the presenter
