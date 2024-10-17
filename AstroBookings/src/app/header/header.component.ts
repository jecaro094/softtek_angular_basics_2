import { Component } from '@angular/core';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <nav>
        {{ title }}
        <span>
          @for(item of menu; track item.link) {
          <a [href]="item.link">{{ item.title }}</a>
          }
        </span>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  title = 'Astro Bookings';
  menu = [
    { title: 'ℹ️ About us', link: '/info' },
    { title: '🔓Log in', link: '/login' },
  ];
}
