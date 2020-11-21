import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private managerUrl = 'http://localhost:8080/manager';
  private adminUrl = 'https://automatically-testing-java.herokuapp.com/admin';
  private url = 'https://automatically-testing-java.herokuapp.com';

  constructor(private http: HttpClient) { }

  getManagerBoard(): Observable<string> {
    return this.http.get(this.managerUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
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
}
