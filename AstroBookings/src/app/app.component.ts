import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lab-header></lab-header>
    <h1>Welcome to {{ title }}!</h1>
    <p>By {{ author }}</p>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Astro Bookings';
  author = 'Softtek';
}
