import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  handleError(error: Error): void {
    console.warn('Global error handler', error);
  }
}
