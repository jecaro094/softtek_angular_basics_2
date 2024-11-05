import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { LoginService } from './routes/login/login.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    // LoginService,
    //{ provide: LoginService, useClass: LoginService },
    provideLoginService(),
    provideHttpClient(),
  ],
};

function provideLoginService() {
  return { provide: LoginService, useClass: LoginService };
}
