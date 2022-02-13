import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:5000/api/users/me';
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.API_URL);
  }
}
