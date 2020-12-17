import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionExecutionDto} from '../model/action-execution-dto';
import {Observable} from "rxjs";
import {FailedPassedActionExecution} from "../model/dashboard/failedPassedActionExecution";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActionExecutionService {

  //private url = 'http://localhost:8080/';
  private url = `${environment.url}`
  private getAllActionExecutionsUrl = this.url + 'list/actions-execution/';
  private getFailedPassedActionExecutionUrl = this.url + 'dashboard/action-execution/';

  constructor(private http: HttpClient) { }

  getAllActionsExecution(testCaseExecutionId: number){
    return this.http.get<ActionExecutionDto[]>(this.getAllActionExecutionsUrl + String(testCaseExecutionId));
  }

  getFailedPassedActionsExecution(status: string): Observable<FailedPassedActionExecution[]> {
    const url = this.getFailedPassedActionExecutionUrl + status;
    return this.http.get<FailedPassedActionExecution[]>(url);
  }
}
