import { ErrorHandler, Injectable } from '@angular/core';

/**
 * Global error handler service
 * - Must be provided in the app config, instead of the ErrorHandler token
 * @implements ErrorHandler - Angular error handler interface
 */
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  handleError(error: Error): void {
    console.warn('Global error handler', error);
  }
}
