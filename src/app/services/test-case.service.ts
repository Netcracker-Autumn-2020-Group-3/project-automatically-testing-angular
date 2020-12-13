import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Params} from '@angular/router';
import {UserDto} from '../users/users-list/user-dto';
import {HttpClient} from '@angular/common/http';
import {DataSet} from '../model/test-case/data-set';
import {Scenario} from '../model/test-case/scenario';
import {ScenarioStep} from '../model/test-case/scenario-step';
import {DataEntry} from '../model/test-case/data-entry';
import {VariableValue} from '../model/test-case/variable-value';
import {TestCaseDto} from '../model/test-case/test-case-dto';
import {TestCaseAll} from '../list-of-test-cases/TestCaseAll';
import {TestScenarioDto} from '../test-scenario/test-scenario-list/test-scenario-dto';
import {TestCaseDtoForPagination} from '../test-case/test-case-list/test-case-dto-for-pagination';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  // private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8081/';
  // private url = 'http://localhost:9003/';
  private countPagesUrl = this.url + 'test-case/pages/count';
  private getDataSetListUrl = this.url + 'data-set/list';
  private getTestScenarioListUrl = this.url + 'test-scenario/list';
  private postTestCaseUrl = this.url + 'test-case/create';
  private updateTestCaseUrl = this.url + 'test-case/update';
  private getTestCases = this.url + 'test-case/list';
  private getTestCaseListUrl = this.url + 'test-case/list/page';
  private executeTestCaseUrl = this.url + 'test-case/execute/';

  constructor(private http: HttpClient) {
  }

  getAllTestCases(): Observable<TestCaseAll[]> {
    return this.http.get<TestCaseAll[]>(this.getTestCases);
  }

  getDataSetList() {
    return this.http.get<DataSet[]>(this.getDataSetListUrl);
  }

  getTestScenarioList() {
    return this.http.get<Scenario[]>(this.getTestScenarioListUrl);
  }

  getTestScenarioSteps(testScenarioId: number) {
    const url = this.url + `test-scenario/${testScenarioId}/steps`;
    return this.http.get<ScenarioStep[]>(url);

  }

  getDataSetEntries(dataSetId: number) {
    const url = this.url + `data-set/${dataSetId}/entries`;
    return this.http.get<DataEntry[]>(url);

  }


  getTestCaseById(testCaseId: number) {
    const url = this.url + `test-case/${testCaseId}`;
    console.log('user: ' + url);
    return this.http.get<TestCaseDto>(url);
  }

  updateTestCase(testCase: TestCaseDto) {
    return this.http.post(this.updateTestCaseUrl, testCase);
  }

  postTestCase(testCaseNameValue: string, projectIdValue: string, dataSetIdValue: number,
               testScenarioIdValue: number, varVals: VariableValue[]) {
    return this.http.post(this.postTestCaseUrl, {
      testCaseName: testCaseNameValue,
      projectId: projectIdValue,
      dataSetId: dataSetIdValue,
      testScenarioId: testScenarioIdValue,
      variableValues: varVals
    });
  }

  executeTestCase(id: number) {
    const url = this.executeTestCaseUrl + id;
    this.http.get(url).toPromise();
}
  getPage(paramsVal: Params) {
    return this.http.get<TestCaseDtoForPagination[]>(this.getTestCaseListUrl, {
      params: paramsVal
    });
  }
  countPages() {
    return this.http.get<number>(this.countPagesUrl);
  }

}
