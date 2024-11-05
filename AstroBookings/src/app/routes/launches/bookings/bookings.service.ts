import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LaunchDto } from '@models/launch.dto';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  http = inject(HttpClient);
  readonly URL = 'http://localhost:3000/api/launches';

  getLaunchById(id: string) {
    return this.http
      .get<LaunchDto>(`${this.URL}/${id}`)
      .subscribe((res) => console.log('Response', res));
  }
}
