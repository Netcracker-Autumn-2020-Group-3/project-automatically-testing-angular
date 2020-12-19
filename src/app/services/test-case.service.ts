import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Params} from '@angular/router';
import {UserDto} from '../users/users-list/user-dto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataSet} from '../model/test-case/data-set';
import {Scenario} from '../model/test-case/scenario';
import {ScenarioStep} from '../model/test-case/scenario-step';
import {DataEntry} from '../model/test-case/data-entry';
import {VariableValue} from '../model/test-case/variable-value';
import {TestCaseDto} from '../model/test-case/test-case-dto';
import {TestCaseAll} from '../list-of-test-cases/TestCaseAll';
import {TestScenarioDto} from '../test-scenario/test-scenario-list/test-scenario-dto';
import {TestCaseDtoForPagination} from '../test-case/test-case-list/test-case-dto-for-pagination';
import {TokenStorageService} from '../auth/token-storage.service';
import {TestCaseTopSubscribed} from '../model/dashboard/test-case-top-subscribed';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  // private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = `${environment.url}test-case/`;

  private executeTestCaseUrl = environment.url + 'test-case/execute/';
  private testCaseExecutionUrl = environment.url + 'test-case-execution';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }
  getAllTestCases(): Observable<TestCaseAll[]> {
    return this.http.get<TestCaseAll[]>(`${this.url}list`);
  }

  getDataSetList() {
    return this.http.get<DataSet[]>(`${environment.url}data-set/list`);
  }

  getTestScenarioList() {
    return this.http.get<Scenario[]>(`${environment.url}test-scenario/list`);
  }

  getTestScenarioSteps(testScenarioId: number) {
    return this.http.get<ScenarioStep[]>(`${environment.url}test-scenario/${testScenarioId}/steps`);
  }

  getDataSetEntries(dataSetId: number) {
    return this.http.get<DataEntry[]>(`${environment.url}data-set/${dataSetId}/entries`);
  }

  getTopFiveSubscribedTestCases(): Observable<TestCaseTopSubscribed[]> {
    return this.http.get<TestCaseTopSubscribed[]>(`${environment.url}dashboard/top-subscribed-test-cases`);
  }


  getTestCaseById(testCaseId: number) {
    return this.http.get<TestCaseDto>(`${this.url}${testCaseId}`);
  }

  updateTestCase(testCaseName: string, id: number, variableValues: VariableValue[]) {
    return this.http.put(`${this.url}${id}`, {testCaseName, id, variableValues});
  }

  postTestCase(testCaseName: string, projectId: string, dataSetId: number, testScenarioId: number, variableValues: VariableValue[]) {
    return this.http.post(`${this.url}`, {testCaseName, projectId, dataSetId, testScenarioId, variableValues});
  }

  getPage(params: Params) {
    return this.http.get<TestCaseDtoForPagination[]>(`${this.url}list/page`, {params});
  }

  getPageByProjectId(params: Params, projectId: number) {
    return this.http.get<TestCaseDtoForPagination[]>(`${this.url}${projectId}/list/page`, {params});
  }

  countPages(projectId: number) {
    return this.http.get<number>(`${this.url}${projectId}/pages/count`);
  }

  follow(testCaseId: number) {
    return this.http.patch(`${this.url}${testCaseId}/follow`, {});
  }

  unfollow(testCaseId: number) {
    return this.http.patch(`${this.url}${testCaseId}/unfollow`, {});
  }

  isFollowed(testCaseId: number) {
    return this.http.get<boolean>(`${this.url}${testCaseId}/is-followed`);
  }
  executeTestCase(id: number) {
    const body = this.tokenStorage.getUsername();
    const url = this.testCaseExecutionUrl + '/execute/' + id;
    return this.http.post(url, body).subscribe();
  }

}
