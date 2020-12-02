import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserDto } from '../users-list/user-dto';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://automatically-testing-java.herokuapp.com/';
 // private url = 'http://localhost:8080/';
  //private url = 'http://localhost:9003/';
  private managerUrl = this.url + 'manager';
  private adminUrl = this.url + 'admin';
  private getUsersListUrl = this.url + 'users/list';
  private countPagesUrl = this.url + 'users/pages/count';

  constructor(private http: HttpClient) {
  }

  getManagerBoard(): Observable<string> {
    return this.http.get(this.managerUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.url}users/${id}`;
    return this.http.get<User>(url);
    // return this.http.get<User>(`${this.url}/users/${id}`);
  }
  updateUser(user: User) {
    const url = `${this.url}users/updateUser`;
    const body = {id: user.id, email: user.email, name: user.name, surname: user.surname, role: user.role, enabled: user.enabled};
    // const body = {userId: user.userId, email: user.email, name: user.name, surname: user.surname, role: user.role, enabled: user.enabled};
    return this.http.post(url, body).toPromise();
  }

  getPage(paramsVal: Params) {
    return this.http.get<UserDto[]>(this.getUsersListUrl, {
      params: paramsVal
    });
  }
  countPages() {
    return this.http.get<number>(this.countPagesUrl);
  }
}
