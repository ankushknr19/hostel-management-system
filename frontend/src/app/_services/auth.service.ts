//This service sends signup, login HTTP POST requests to backend.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/api';
const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}/sessions`,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.delete(`${AUTH_API}/sessions`, httpOptions);
  }

  register(email: string, phone: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}/users`,
      {
        email,
        phone,
        password,
      },
      httpOptions
    );
  }
}
