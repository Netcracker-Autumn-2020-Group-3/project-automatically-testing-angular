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
import {TestCase} from '../model/test-case/test-case';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  // private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8080/';
  // private url = 'http://localhost:9003/';
  private getDataSetListUrl = this.url + 'data-set/list';
  private getTestScenarioListUrl = this.url + 'test-scenario/list';
  private postTestCaseUrl = this.url + 'test-case/create';
  private updateTestCaseUrl = this.url + 'test-case/update';

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


  getTestCaseById(testCaseId: number) {
    const url = this.url + `test-case/${testCaseId}`;
    return this.http.get<TestCase>(url);
    /*const testCase: TestCase =  {
      name: 'dog',
      userId: 1,
      projectId: 11,
      dataSetId: 43,
      testScenarioId: 1,
      scenarioStepsWithData: [{
        priority: 1,
        compound: {id: 2, name: 'login', description: 'description'},
        actionDto: [{
          id: 1,
          name: 'Enter login',
          variables: [{id: 8, name: 'login input', dataEntry: {id: 64, dataSetId: 43, value: 'url'}}, {
            id: 9,
            name: 'login value',
            dataEntry: {id: 64, dataSetId: 43, value: 'url'}
          }]
        }, {
          id: 2,
          name: 'Enter password',
          variables: [{id: 10, name: 'password input', dataEntry: {id: 64, dataSetId: 43, value: 'url'}}, {
            id: 11,
            name: 'password value',
            dataEntry: {id: 64, dataSetId: 43, value: 'url'}
          }]
        }, {
          id: 3,
          name: 'click',
          variables: [{id: 6, name: 'anyname', dataEntry: {id: 64, dataSetId: 43, value: 'url'}}, {
            id: 12,
            name: 'element',
            dataEntry: {id: 64, dataSetId: 43, value: 'url'}
          }]
        }]
      },
        {
          priority: 2,
          actionDto:
            [{id: 4, name: 'Logout', variables: [{id: 13, name: 'button', dataEntry: {id: 64, dataSetId: 43, value: 'url'}}]}]
        }
      ]
    };
    console.log('service ' + testCase);
    return testCase;*/
  }

  updateTestCase(testCase: TestCase) {
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

}
