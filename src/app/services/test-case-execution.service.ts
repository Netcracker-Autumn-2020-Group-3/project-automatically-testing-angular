import {Injectable} from '@angular/core';
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
  private countTestCaseExecutionsUrl = this.url + 'count';

  private testCaseName: string;
  private projectName: string;


  constructor(private http: HttpClient) {
  }

  getAllTestCaseExecutionWithFailedActionNumber(limit: number, offset: number, orderBy: string, orderByClause: string, testCaseName: string,
                                                projectName: string, status: string): Observable<TestCaseExecutionWithFailedActionNumber[]> {
    this.toUndefined(testCaseName, projectName);
    return this.http.get<TestCaseExecutionWithFailedActionNumber[]>(`${this.url}${limit}/${offset}/${orderBy}/${orderByClause}
      /${this.testCaseName}/${this.projectName}/${status}`);
  }

  countTestCaseExecutions(testCaseName: string, projectName: string, status: string) {
    this.toUndefined(testCaseName, projectName);
    return this.http.get<number>(`${this.countTestCaseExecutionsUrl}/${this.testCaseName}/${this.projectName}/${status}`);
  }

  toUndefined(testCaseName: string, projectName: string) {
    this.testCaseName = (testCaseName == '') ? 'undefined' : testCaseName;
    this.projectName = (projectName == '') ? 'undefined' : projectName;
  }
}
