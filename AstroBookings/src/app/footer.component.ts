import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <nav>
        <a [href]="author.homepage"> Year {{ year }}, {{ author.name }}</a>
        @if (!cookiesAccepted) {
          <button (click)="onAcceptClick()">Accept Cookies</button>
        }@else{
          🍪
        }
      </nav>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  author = {
    name: 'Softtek',
    homepage: 'https://www.softtek.com',
  };
  year = new Date().getFullYear();
  cookiesAccepted = false;

  public onAcceptClick(): void {
    console.log('Accept clicked');
    this.cookiesAccepted = true;
    console.log('Cookies accepted:', this.cookiesAccepted);
  }
}
