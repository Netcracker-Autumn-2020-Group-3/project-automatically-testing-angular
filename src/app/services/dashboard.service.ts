import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8081/dashboard';
  private userCountUrl = this.url + '/user-count';
  private adminCountUrl = this.userCountUrl + '?role-id=1';
  private managerCountUrl = this.userCountUrl + '?role-id=2';
  private engineerCountUrl = this.userCountUrl + '?role-id=3';
  constructor(private http: HttpClient) { }

  getUserCount() {
    return this.http.get<number>(this.userCountUrl);
  }

  getAdminCount() {
    return this.http.get<number>(this.adminCountUrl);
  }

  getManagerCount() {
    return this.http.get<number>(this.managerCountUrl);
  }

  getEngineerCount() {
    return this.http.get<number>(this.engineerCountUrl);
  }

}
