import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Action} from '../model/action.model';
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibraryActionService {

  constructor(private http: HttpClient) { }

  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8080/';
  //private getActionsUrl = 'https://automatically-testing-java.herokuapp.com/library/actions';
  private getActionsUrl = 'http://localhost:8080/library/actions';
  //private getActionsByNameUrl = 'https://automatically-testing-java.herokuapp.com/library/actions/';
  private getActionsByNameUrl = 'http://localhost:8080/library/actions/';
  private getNumberOfActionsUrl = this.getActionsByNameUrl + 'count';



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

 createAction(name: string, description: string, variableValues: string[]) {
   const url = this.url + "create-action/" + name + "/" + description;
   this.http.post(url,variableValues).toPromise();
 }
}
