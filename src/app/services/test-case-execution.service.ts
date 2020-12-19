import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestCaseExecution} from "../model/testCaseExecution";
import {TestCaseExecutionWithFailedActionNumber} from "../model/testCaseExecutionWithFailedActionNumber";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TestCaseExecutionService {

  private url = `${environment.url}test-case-execution/`;
  private getAllTestCaseExecutionUrl = this.url + 'get-all';
  private getAllTestCaseExecutionWithFailedActionNumberUrl = this.url + 'get-all-with-failed-action-number';
  private countTestCaseExecutionsUrl = this.url + 'count';


  constructor(private http: HttpClient) { }

  getAllTestCaseExecutionWithFailedActionNumber(limit: number, offset: number, orderBy: string, orderByClause: string, testCaseName: string, projectName: string, status: string): Observable<TestCaseExecutionWithFailedActionNumber[]> {
    return this.http.get<TestCaseExecutionWithFailedActionNumber[]>(`${this.getAllTestCaseExecutionWithFailedActionNumberUrl}/${limit}/${offset}
    /${orderBy}/${orderByClause}/${testCaseName}/${projectName}/${status}`);
  }

  countTestCaseExecutions() {
    return this.http.get<number>(this.countTestCaseExecutionsUrl);
  }
}
