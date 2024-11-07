import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { BOOKINGS_DB } from '@db/bookings';
import { LAUNCHES_DB } from '@db/launches';
import { BookingDto } from '@models/booking.dto';
import { LaunchDto, LaunchStatus, NULL_LAUNCH } from '@models/launch.dto';
import { NULL_ROCKET, RocketDto } from '@models/rocket.dto';
import { map, tap } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { BookFormComponent } from './book-form.component';
import { BookingsService } from './bookings.service';
import { LaunchHeaderComponent } from './launch-header.component';
/**
 * Bookings page componente
 * Display the launch details and the booking form
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LaunchHeaderComponent, BookFormComponent],
  template: `
    <article>
      <lab-launch-header [launch]="launch()" [status]="launchStatus()" />
      {{ rocket().name }} - {{ rocket().range }}
      <lab-book-form
        [rocket]="rocket()"
        [currentTravelers]="currentTravelers()"
        (bookTravel)="onBookTravel($event)" />
    </article>
  `,
})
export default class BookingsPage {
  bookingsService = inject(BookingsService);

  // Input signals

  /**
   * Launch id, comes from the route :id param
   */
  id: InputSignal<string> = input.required<string>();

  // Writable signals

  /**
   * New travelers, comes from the book form
   */
  newTravelers: WritableSignal<number> = signal(0);

  // Computed signals

  /**
   * Launch object, computed from the id
   * Default to NULL_LAUNCH if not found
   */
  // launch: Signal<LaunchDto> = computed(
  //   () => LAUNCHES_DB.find((launch) => launch.id === this.id()) || NULL_LAUNCH,
  // );
  launch: WritableSignal<LaunchDto> = signal(NULL_LAUNCH);

  /**
   * Rocket object, computed from the launch
   * Default to NULL_ROCKET if not found
   */
  // rocket: Signal<RocketDto> = computed(
  //   () => ROCKETS_DB.find((rocket) => rocket.id === this.launch().rocketId) || NULL_ROCKET,
  // );
  rocket: WritableSignal<RocketDto> = signal(NULL_ROCKET);

  /**
   * Current travelers, computed from the number of seats booked for this launch
   */
  // currentTravelers: Signal<number> = computed(() => {
  //   // get the bookings for the launch
  //   const bookings = BOOKINGS_DB.filter((booking) => booking.launchId === this.id());
  //   // return the number of travelers
  //   return bookings.reduce((acc, booking) => acc + booking.numberOfSeats, 0);
  // });
  currentTravelers: WritableSignal<number> = signal(0);
  /**
   * Total travelers, computed from the current travelers and the new travelers
   */
  totalTravelers: Signal<number> = computed(() => this.currentTravelers() + this.newTravelers());
  /**
   * Launch status, computed from the total travelers and the rocket capacity
   * It is used as a readonly signal in the launch header component
   */
  launchStatus: Signal<LaunchStatus> = computed(() => {
    const occupation = this.totalTravelers() / this.rocket().capacity;
    if (occupation >= 0.8) {
      return 'confirmed';
    } else {
      return 'delayed';
    }
  });

  // Effects

  constructor() {
    // effect(() => {
    //   const x = this.id();
    //   console.log('id', x);
    //   this.bookingsService.getLaunchById(x).subscribe((y) => this.launch.set(y));
    // });
  }

  getLaunchEffect = effect(
    () => {
      // signal triggers
      const launchId = this.id();
      // side effects
      this.bookingsService.getLaunchById$(launchId).subscribe({
        next: (launch) => this.launch.set(launch),
        error: (error) => console.error('Error getting launch', errorContext(error)),
      });
    },
    { allowSignalWrites: true },
  );

  getRocketWhenLaunchChangesEffect = effect(
    () => {
      // signal triggers
      const rocketId = this.launch().rocketId;
      if (!rocketId) return;
      // side effects
      this.bookingsService.getRocketById$(rocketId).subscribe((rocket) => this.rocket.set(rocket));
    },
    { allowSignalWrites: true },
  );

  getBookingsEffect = effect(
    () => {
      // signal triggers
      const id = this.id();
      if (!id) return;
      // side effects
      this.bookingsService
        .getBookingsByLaunchId$(id)
        .pipe(
          map((bookings: BookingDto[]) =>
            bookings.reduce((acc, booking) => acc + booking.numberOfSeats, 0),
          ),
          tap((currentTravelers: number) => this.currentTravelers.set(currentTravelers)),
        )
        .subscribe();
    },
    {
      allowSignalWrites: true,
    },
  );

  /**
   * Effect to save the launch status to the database
   * - It is triggered when any signal changes
   * - It changes the database if the launch status changes
   * - It creates a new booking if a traveler books a seat
   * - Both are side effects
   */
  saveLaunchEffect = effect(() => {
    // signal triggers
    const newTravelers = this.newTravelers();
    const launch = this.launch();
    const status = this.launchStatus();
    // side effects
    // update the launch status in the database
    if (launch.status !== status) {
      const updatedLaunch = { ...launch, status };
      const launchIndex = LAUNCHES_DB.findIndex((l) => l.id === launch.id);
      if (launchIndex === -1) return;
      LAUNCHES_DB[launchIndex] = updatedLaunch;
    }
    // create a new booking in the database
    const newBooking: BookingDto = {
      id: `bkg_${BOOKINGS_DB.length + 1}`,
      travelerId: `usr_t1`,
      launchId: launch.id,
      numberOfSeats: newTravelers,
      totalPrice: launch.pricePerSeat * newTravelers,
      status: 'pending',
    };
    BOOKINGS_DB.push(newBooking);
  });

  // Methods (event handlers)

  /**
   * Event handler for the book form
   * - Triggers when the user books a new traveler
   * @param newTravelers - Number of new travelers
   */
  onBookTravel(newTravelers = 0) {
    console.log('Booked travelers:', newTravelers);
    this.newTravelers.set(newTravelers);
  }
}
