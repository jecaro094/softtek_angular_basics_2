import { ChangeDetectionStrategy, Component } from '@angular/core';
import { launchDto } from './models/launch.dto';
import {
  JsonPipe,
  UpperCasePipe,
  CurrencyPipe,
  DatePipe,
} from '@angular/common';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  imports: [JsonPipe, UpperCasePipe, CurrencyPipe, DatePipe],
  template: `
    <article>
      <header>
        <h2>{{ launch.mission }} {{ launch.destination }}</h2>
        <div [class]="launch.status">
          <span>{{
            launch.pricePerSeat | currency: 'USD' : 'symbol' : '1.0-0'
          }}</span>
          <span>{{ launch.date | date: 'dd/MM/yyyy' }}</span>
          <span>{{ launch.status | uppercase }}</span>
        </div>
      </header>
      <main>
        <p>Travelers: {{ currentTravelers }}</p>
      </main>
      <footer>
        <button>Book now!</button>
        <button>Cancel</button>
      </footer>
    </article>
  `,
  styles: `
    .Scheduled {
      background-color: lightgreen;
      color: darkgreen;
    }
    .Aborted {
      background-color: lightcoral;
      color: darkred;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  launch: launchDto = {
    id: '1',
    agencyId: '1',
    rocketId: '1',
    date: new Date(),
    mission: 'Mission',
    destination: 'Destination',
    pricePerSeat: 1000000000,
    status: 'Scheduled',
  };
  currentTravelers = 2;
}
