import {Component, OnInit} from '@angular/core';
import {ScenarioStep} from '../model/test-case/scenario-step';
import {VariableValue} from '../model/test-case/variable-value';
import {DataEntry} from '../model/test-case/data-entry';
import {Scenario} from '../model/test-case/scenario';
import {Dataset} from '../model/test-case/dataset';


@Component({
  selector: 'app-test-case-create',
  templateUrl: './test-case-create.component.html',
  styleUrls: ['./test-case-create.component.css']
})
export class TestCaseCreateComponent implements OnInit {

  scenarioSteps: ScenarioStep[] = [];
  dataEntries: DataEntry[] = [];
  varVals: VariableValue[][][] = [];
  testCaseName = '';
  scenario: Scenario;
  scenarios: Scenario[] = [];
  dataset: Dataset;
  datasets: Dataset[] = [];
  showForm = false;

  constructor() {

  }

  onScenarioChosen() {
    // get load scenario steps
    this.scenarioSteps = [
      {
        priority: 1,
        compound: {id: 1, name: 'login compound'},
        actions: [
          {id: 1, name: 'Enter login', variables: [{id: 45, name: 'input element'}, {id: 46, name: 'login'}]},
          {id: 2, name: 'Enter password', variables: [{id: 47, name: 'input element'}, {id: 48, name: 'passsword'}]},
          {id: 3, name: 'Submit', variables: [{id: 49, name: 'submit button'}]}
        ]
      },
      {
        priority: 2,
        actions: [
          {id: 4, name: 'Logout', variables: [{id: 50, name: 'logout button'}]}
        ]
      }
    ];

    if (this.dataEntries !== undefined && this.dataEntries.length !== 0) {
      this.showForm = true;
      this.initVarVals();
    }
  }

  onDatasetChosen() {
    // get load data entries
    this.dataEntries = [{id: 64, value: 'login input id'},
      {id: 65, value: 'login input id'},
      {id: 66, value: 'password input id'},
      {id: 67, value: 'login1'},
      {id: 68, value: 'login2'},
      {id: 69, value: 'qwerty1'},
      {id: 70, value: 'qwerty2'},
      {id: 71, value: 'logout button'}];
    if (this.scenarioSteps !== undefined && this.scenarioSteps.length !== 0) {
      this.showForm = true;
      this.initVarVals();
    }
  }
  initVarVals() {
    this.scenarioSteps.forEach((step, i) => {
      this.varVals[i] = [];
      step.actions.forEach((action, j) => {
        this.varVals[i][j] = [];
        action.variables.forEach((variable, k) => {
          this.varVals[i][j][k] = new VariableValue(action.id, variable.id);
        });
      });
    });
  }

  ngOnInit(): void {
    // load scenarios and datasets
    this.scenarios = [{id: 123, name: 'Login-logout scenario'}];
    this.datasets = [{id: 665, name: 'Login-logout dataset'}];
  }

  onDataEntrySelect(i: number, j: number, k: number): void {
    console.log(this.varVals[i][j][k]);
  }

}
