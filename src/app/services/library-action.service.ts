import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Action} from '../main-library-list-actions/list-actions/action.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryActionService {

  constructor(private http: HttpClient) { }

  private getActionsUrl = 'http://localhost:8080/library/actions';
  private getActionsByNameUrl = 'http://localhost:8080/library/actions/';

  getActions(): Observable<Action[]>{
    return this.http.get<Action[]>(this.getActionsUrl);
  }

  getActionsByName(actionName: string): Observable<Action[]>{
    return this.http.get<Action[]>(this.getActionsByNameUrl + actionName);
  }



}
