import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionExecutionDto} from '../model/action-execution-dto';

@Injectable({
  providedIn: 'root'
})
export class ActionExecutionService {

  private url = 'http://localhost:8080/';
  private getAllActionExecutionsUrl = this.url + 'list/actions-execution/';
  constructor(private http: HttpClient) { }

  getAllActionsExecution(testCaseExecutionId: number){
    return this.http.get<ActionExecutionDto[]>(this.getAllActionExecutionsUrl + String(testCaseExecutionId));
  }

}
