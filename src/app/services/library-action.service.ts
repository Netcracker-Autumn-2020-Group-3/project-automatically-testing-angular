import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Action} from '../main-library-list-actions/list-actions/action.model';
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibraryActionService {

  constructor(private http: HttpClient) { }

  //private getActionsUrl = 'https://automatically-testing-java.herokuapp.com/library/actions';
  private getActionsUrl = 'http://localhost:8080/library/actions';
 //private getActionsByNameUrl = 'https://automatically-testing-java.herokuapp.com/library/actions/';
 private getActionsByNameUrl = 'http://localhost:8080/library/actions/';
 private getNumberOfActionsUrl = 'http://localhost:8080/library/actions/count';

  getActions(paramsVal: Params): Observable<Action[]>{
    return this.http.get<Action[]>(this.getActionsUrl, {
      params: paramsVal
    });
  }

  getActionsByName(paramsVal: Params, actionName: string): Observable<Action[]>{
    return this.http.get<Action[]>(this.getActionsByNameUrl + actionName, {  params: paramsVal});
  }

  getNumberOfActions(){
    return this.http.get<number>(this.getNumberOfActionsUrl);
  }



}
