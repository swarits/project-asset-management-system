import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    if (localStorage.id != undefined) {
      return true;
    }
    return false;
  }

}