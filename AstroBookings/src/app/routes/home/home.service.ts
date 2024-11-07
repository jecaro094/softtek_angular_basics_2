import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LaunchDto } from '@models/launch.dto';
import { Observable } from 'rxjs';

/**
 * Home service to get the list of launches
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  http = inject(HttpClient);
  readonly URL = 'http://localhost:3000/api/launches?delay=1000';

  /**
   * Get the list of launches as a signal
   */
  getLaunches(): Signal<LaunchDto[]> {
    const getLaunches$: Observable<LaunchDto[]> = this.http.get<LaunchDto[]>(this.URL);
    return toSignal(getLaunches$, { initialValue: [] });
  }
}
