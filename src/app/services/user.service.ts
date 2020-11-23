import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private managerUrl = 'https://automatically-testing-java.herokuapp.com/manager';
  private adminUrl = 'https://automatically-testing-java.herokuapp.com/admin';

  constructor(private http: HttpClient) { }

  getManagerBoard(): Observable<string> {
    return this.http.get(this.managerUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
