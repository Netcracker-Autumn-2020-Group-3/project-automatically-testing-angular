import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Params} from '@angular/router';
import {UserDto} from '../users-list/user-dto';
import {HttpClient} from '@angular/common/http';
import {DataSet} from '../model/test-case/data-set';
import {Scenario} from '../model/test-case/scenario';
import {ScenarioStep} from '../model/test-case/scenario-step';
import {DataEntry} from '../model/test-case/data-entry';
import {VariableValue} from '../model/test-case/variable-value';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  // private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8080/';
  private getDataSetListUrl = this.url + 'data-set/list';
  private getTestScenarioListUrl = this.url + 'test-scenario/list';
  private postTestCaseUrl = this.url + 'test-case/create';

  constructor(private http: HttpClient) {
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

  postTestCase(testCaseNameValue: string, projectIdValue: string, dataSetIdValue: number, testScenarioIdValue: number, varVals: VariableValue[]) {
    return this.http.post(this.postTestCaseUrl, {
      testCaseName: testCaseNameValue,
      projectId: projectIdValue,
      dataSetId: dataSetIdValue,
      testScenarioId: testScenarioIdValue,
      variableValues: varVals
    }).toPromise();
  }

}
