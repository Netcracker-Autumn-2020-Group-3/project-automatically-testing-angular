import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestCaseExecution} from "../model/testCaseExecution";
import {TestCaseExecutionWithFailedActionNumber} from "../model/testCaseExecutionWithFailedActionNumber";

@Injectable({
  providedIn: 'root'
})
export class TestCaseExecutionService {

  private url = 'http://localhost:8080/test-case-execution/';
  private getAllTestCaseExecutionUrl = this.url + 'get-all';
  private getAllTestCaseExecutionWithFailedActionNumberUrl = this.url + 'get-all-with-failed-action-number';

  constructor(private http: HttpClient) { }

  getAllTestCaseExecutionWithFailedActionNumber(): Observable<TestCaseExecutionWithFailedActionNumber[]> {
    return this.http.get<TestCaseExecutionWithFailedActionNumber[]>(this.getAllTestCaseExecutionWithFailedActionNumberUrl);
  }
}
