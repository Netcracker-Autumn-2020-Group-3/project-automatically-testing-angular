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

  constructor(private http: HttpClient) { }

  getTestCaseExecutionsByDates(numberOfDays: number) {
    return this.http.get<TestCaseExecutionsByDates[]>(`${this.url}test-case-executions-by-dates?numberOfDays=${numberOfDays}`);
  }


  getGroupedTestCaseExecution() {
    return this.http.get<GroupedTestCaseExecutionDto[]>(this.getGroupedTestCaseExecutionsUrl);
  }
}
