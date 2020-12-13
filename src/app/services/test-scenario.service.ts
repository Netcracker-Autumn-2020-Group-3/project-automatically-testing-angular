import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EntityIdName} from '../model/test-scenario/EntityIdName';
import {TestScenario} from '../model/test-scenario/TestScenario';
import {Params} from '@angular/router';
import {TestScenarioDto} from '../test-scenario/test-scenario-list/test-scenario-dto';
import {environment} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TestScenarioService {

  // private url = 'https://automatically-testing-java.herokuapp.com/test-scenario';
  private url = `${environment.url}test-scenario/`;
  private getTestScenarioListUrl = this.url + 'list/page/';
  private countPagesUrl = this.url + 'pages/count/';

  constructor(private http: HttpClient) {}
  getAllCompoundsWithIdAndName(): Observable<EntityIdName[]> {
    return this.http.get<EntityIdName[]>(`${this.url}compounds`);
  }

  getAllActionsWithIdAndName(): Observable<EntityIdName[]> {
    return this.http.get<EntityIdName[]>(`${this.url}actions`);
  }

  createTestScenario(testScenario: TestScenario): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(this.url, testScenario, {observe: 'response'});
  }


  getPage(paramsVal: Params) {
    return this.http.get<TestScenarioDto[]>(this.getTestScenarioListUrl, {
      params: paramsVal
    });
  }
  countPages() {
    return this.http.get<number>(this.countPagesUrl);
  }

}
