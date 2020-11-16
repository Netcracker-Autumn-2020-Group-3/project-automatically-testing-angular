import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';


  public username = '';

  public password = '';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:ban-types typedef
  authenticationService(username: String, password: String) {
    return this.http.get('http://localhost:8080/login',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      // @ts-ignore
      this.username = username;
      // @ts-ignore
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  // tslint:disable-next-line:typedef ban-types
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  // tslint:disable-next-line:typedef ban-types
  registerSuccessfulLogin(username: String, password: String) {
    // @ts-ignore
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  // tslint:disable-next-line:typedef
  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }


}
