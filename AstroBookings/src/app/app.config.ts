import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { apiAuditorInterceptor } from './core/api-auditor.interceptor';
import { GlobalErrorHandlerService } from './core/global-error-handler.service';
import { LoginService } from './routes/login/login.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    // LoginService,
    //{ provide: LoginService, useClass: LoginService },
    provideLoginService(),
    provideHttpClient(withInterceptors([apiAuditorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
};

function provideLoginService() {
  return { provide: LoginService, useClass: LoginService };
}
