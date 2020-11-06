import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config = require('../../assets/json/config.json');

  constructor(private http: HttpClient) { }

  signUp(userData) {
    return this.http.post<any>(this.config.host + "user/signup/", userData, { observe: 'response' });
  }

  signIn(userData) {
    return this.http.post<any>(this.config.host + 'user/login/', userData, { observe: 'response' });
  }

  logOut() {
    localStorage.clear();
  }

}
