import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TestCaseExecutionsByDates} from '../model/dashboard/test-case-executions-by-dates';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = `${environment.url}dashboard/`;

  constructor(private http: HttpClient) { }

  getTestCaseExecutionsByDates(numberOfDays: number){
      return this.http.get<TestCaseExecutionsByDates[]>(`${this.url}test-case-executions-by-dates?numberOfDays=${numberOfDays}`);
  }
}
