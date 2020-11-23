import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Action} from '../main-library-list-actions/list-actions/action.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryActionService {

  constructor(private http: HttpClient) { }

  private getActionsUrl = 'https://automatically-testing-java.herokuapp.com/library/actions';
  private getActionsByNameUrl = 'https://automatically-testing-java.herokuapp.com/library/actions/';

  getActions(): Observable<Action[]>{
    return this.http.get<Action[]>(this.getActionsUrl);
  }

  getActionsByName(actionName: string): Observable<Action[]>{
    return this.http.get<Action[]>(this.getActionsByNameUrl + actionName);
  }



}
