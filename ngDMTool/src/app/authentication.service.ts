import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.baseUrl;


  login(username, password) {
    console.log(username + ' ' + password);
    const token = this.generateBasicAuthToken(username, password);

    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`).set('X-Requested-With', 'XMLHttpRequest');

    console.log(token);
    return this.http
    .get(`${this.url}authenticate`, {headers})
    .pipe(
      tap((res) => {
        console.log('token in');
        localStorage.setItem('token', token);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  register(user) {
    console.log(user);
    return this.http.post(`${this.url}register`, user)
    .pipe(
      tap(res => {
        console.log('loggin in');
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  generateBasicAuthToken(username, password) {
    return btoa(`${username}:${password}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  constructor(private http: HttpClient) { }
}
