import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  imports: [],
  template: `
    <p>
      bookings works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingsComponent {
  launch
}
