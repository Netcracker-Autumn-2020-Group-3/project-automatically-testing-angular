import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

//import {Injectable} from '@angular/core';
//import {HttpClient, HttpParams} from '@angular/common/http';
//import {Observable} from 'rxjs';
//import {User} from '../interfaces/user';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private managerUrl = 'http://localhost:8080/manager';
  private adminUrl = 'https://automatically-testing-java.herokuapp.com/admin';
  private url = 'https://automatically-testing-java.herokuapp.com';

  private getUsersListUrl = this.url+'/users/list';
  private countPagesUrl = this.url+'/users/pages/count';

  constructor(private http: HttpClient) {
  }

  getManagerBoard(): Observable<string> {
    return this.http.get(this.managerUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.url}/users/${id}`;
    return this.http.get<User>(url);
    //return this.http.get<User>(`${this.url}/users/${id}`);
  }
  updateUser(user: User) {
    const url = `${this.url}/users/updateUser`;
    const body = {userId: user.userId, email: user.email, name: user.name, surname: user.surname, role: user.role, enabled: user.enabled};
    return this.http.post(url, body).toPromise();
  }

  getPage(paramsVal: Params) {
    return this.http.get<User[]>(this.getUsersListUrl, {
      params: paramsVal
    });
  }

  countPages() {
    return this.http.get<number>(this.countPagesUrl);
  }
}
