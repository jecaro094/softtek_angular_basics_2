import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookingDto } from '@models/booking.dto';
import { LaunchDto } from '@models/launch.dto';
import { RocketDto } from '@models/rocket.dto';
import { Observable } from 'rxjs';

/**
 * Bookings service to get the launch by id
 */
@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  http = inject(HttpClient);
  readonly URL = 'http://localhost:3000/api';
  readonly LAUNCHES = `${this.URL}/launches`;
  readonly ROCKETS = `${this.URL}/rockets`;
  readonly BOOKINGS = `${this.URL}/bookings`;

  /**
   * Get a launch by id
   * @param id Launch id
   */
  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.http.get<LaunchDto>(`${this.LAUNCHES}/${id}`);
    //.subscribe((res) => console.log('Response', res));
  }

  getRocketById$(rocketId: string): Observable<RocketDto> {
    return this.http.get<RocketDto>(`${this.ROCKETS}/${rocketId}`);
  }

  getBookingsByLaunchId$(launchId: string): Observable<BookingDto[]> {
    const url = `${this.BOOKINGS}?key=launchId&value=${launchId}`;
    return this.http.get<BookingDto[]>(url);
  }
}
