// HttpInterceptor has intercept() method to inspect and transform HTTP requests before they are sent to server.
//sets accesstoken and refresh token in header of every http request made
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const accessToken = this.tokenStorageService.getAccessToken();
    const refreshToken = this.tokenStorageService.getRefreshToken();

    if (accessToken != null && refreshToken != null) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'x-refresh': refreshToken,
      });

      authReq = req.clone({ headers });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
