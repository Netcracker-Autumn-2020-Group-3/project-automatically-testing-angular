import {Component, OnInit} from '@angular/core';
import {ScenarioStep} from '../model/scenario-step';
import {VariableValue} from '../model/variable-value';
import {DataEntry} from '../model/data-entry';


@Component({
  selector: 'app-test-case-create',
  templateUrl: './test-case-create.component.html',
  styleUrls: ['./test-case-create.component.css']
})
export class TestCaseCreateComponent implements OnInit {

  scenario: ScenarioStep[];
  dataEntries: DataEntry[] = [];
  variableValues: VariableValue[] = [];
  selectedDataEntryId = 0;
  varvals: VariableValue[][][] = [];
  testCaseName = '';

  constructor() {
    this.scenario = [
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

    this.dataEntries = [{id: 64, value: 'login input id'},
      {id: 65, value: 'login input id'},
      {id: 66, value: 'password input id'},
      {id: 67, value: 'login1'},
      {id: 68, value: 'login2'},
      {id: 69, value: 'qwerty1'},
      {id: 70, value: 'qwerty2'},
      {id: 71, value: 'logout button'}];

    this.scenario.forEach((step, i) => {
      this.varvals[i] = [];
      step.actions.forEach((action, j) => {
        this.varvals[i][j] = [];
        action.variables.forEach((variable, k) => {
          this.variableValues.push(new VariableValue(action.id, variable.id));
          // this.varvals.push([action.id, variable.id]);
          this.varvals[i][j][k] = new VariableValue(action.id, variable.id);
        });
      });
    });

  }

  ngOnInit(): void {
  }

  onDataEntrySelect(i: number, j: number, k: number): void {
    console.log(this.varvals[i][j][k]);
  }

}
