import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupedTestCaseExecutionDto} from '../model/dashboard/groupedTestCaseExecutionDto.model';
import {environment} from '../../environments/environment';
import {TestCaseExecutionsByDates} from '../model/dashboard/test-case-executions-by-dates';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = `${environment.url}dashboard/`;
  private getGroupedTestCaseExecutionsUrl = this.url + 'test-case-execution/grouped-number';
  private userCountUrl = this.url + '/user-count';
  private adminCountUrl = this.userCountUrl + '?role-id=1';
  private managerCountUrl = this.userCountUrl + '?role-id=2';
  private engineerCountUrl = this.userCountUrl + '?role-id=3';
  constructor(private http: HttpClient) { }

  getTestCaseExecutionsByDates(numberOfDays: number) {
    return this.http.get<TestCaseExecutionsByDates[]>(`${this.url}test-case-executions-by-dates?numberOfDays=${numberOfDays}`);
  }


  getGroupedTestCaseExecution() {
    return this.http.get<GroupedTestCaseExecutionDto[]>(this.getGroupedTestCaseExecutionsUrl);
  }

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
