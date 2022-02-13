//manages token and user information (user_id, email, roles) inside Browser’s Session Storage.
// For Logout, we only need to clear this Session Storage.
import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access-token'; //key name for headers
const REFRESH_TOKEN = 'refresh-token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  saveAccessToken(accessToken: string) {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  saveRefreshToken(refreshToken: string) {
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    window.sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getAccessToken() {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  } //used by interceptor

  getRefreshToken() {
    return window.sessionStorage.getItem(REFRESH_TOKEN);
  }

  clearTokens() {
    window.sessionStorage.clear();
    //should also make delete request to api/sessions which sends null tokens
  }
}
