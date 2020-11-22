import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../users-list/user';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private managerUrl = 'http://localhost:8080/manager';
  private adminUrl = 'https://automatically-testing-java.herokuapp.com/admin';

  private getUsersListUrl = 'http://localhost:8080/users/list';
  private countPagesUrl = 'http://localhost:8080/users/pages/count';

  constructor(private http: HttpClient) {
  }

  getManagerBoard(): Observable<string> {
    return this.http.get(this.managerUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
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
