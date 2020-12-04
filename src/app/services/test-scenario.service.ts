import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EntityIdName} from '../model/test-scenario/EntityIdName';
import {TestScenario} from '../model/test-scenario/TestScenario';

@Injectable({providedIn: 'root'})
export class TestScenarioService {

  private url = 'https://automatically-testing-java.herokuapp.com/test-scenario';
  // private url = 'http://localhost:8080/test-scenarios';
  constructor(private http: HttpClient) {}
  getAllCompoundsWithIdAndName(): Observable<EntityIdName[]> {
    return this.http.get<EntityIdName[]>(`${this.url}/compounds`);
  }

  getAllActionsWithIdAndName(): Observable<EntityIdName[]> {
    return this.http.get<EntityIdName[]>(`${this.url}/actions`);
  }

  createTestScenario(testScenario: TestScenario): Observable<TestScenario> {
    return this.http.post<TestScenario>(this.url, testScenario);
  }

}
