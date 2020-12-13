import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupedTestCaseExecutionDto} from '../model/dashboard/groupedTestCaseExecutionDto.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'http://localhost:8080/dashboard/';
  private getGroupedTestCaseExecutionsUrl = this.url + 'test-case-execution/grouped-number';

  constructor(private http: HttpClient) { }

  getGroupedTestCaseExecution() {
    return this.http.get<GroupedTestCaseExecutionDto[]>(this.getGroupedTestCaseExecutionsUrl);
  }
}
