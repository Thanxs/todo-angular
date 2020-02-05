import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  url = '/api';
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    return this.http.post(`${this.url}/auth/login`, {
      value: 'Alex'
    }, {
      headers: this.headers,
      withCredentials: true
    });
  }

  get token(): string {
    return localStorage.getItem('token');
}

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(token) {
    if (token) {
      localStorage.setItem('token', token.access_token);
      console.log(token);
    } else {
      localStorage.clear();
    }
  }
}
