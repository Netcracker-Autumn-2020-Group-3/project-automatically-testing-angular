import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScenarioStep} from '../../model/test-case/scenario-step';
import {DataEntry} from '../../model/test-case/data-entry';
import {VariableValue} from '../../model/test-case/variable-value';
import {Scenario} from '../../model/test-case/scenario';
import {DataSet} from '../../model/test-case/data-set';
import {ActivatedRoute} from '@angular/router';
import {TestCaseService} from '../../services/test-case.service';

@Component({
  selector: 'app-test-case-body',
  templateUrl: './test-case-body.component.html',
  styleUrls: ['./test-case-body.component.css']
})
export class TestCaseBodyComponent implements OnInit {

  scenarioSteps: ScenarioStep[] = [];
  dataEntries: DataEntry[] = [];
  varVals: VariableValue[][][] = [];
  showForm = false;
  @Output() showFormButton = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
  }

  initVarVals() {
    this.scenarioSteps.forEach((step, i) => {
      this.varVals[i] = [];
      step.actionDto.forEach((action, j) => {
        this.varVals[i][j] = [];
        action.variables.forEach((actionVariable, k) => {
          this.varVals[i][j][k] = new VariableValue(action.id, actionVariable.id,
            (actionVariable.dataEntry === undefined || actionVariable.dataEntry === null) ? -1 : actionVariable.dataEntry.id);
          console.log(this.varVals[i][j][k]);
        });
      });
    });
    this.showFormButton.emit(true);
  }


  onDataEntrySelect(i: number, j: number, k: number): void {
    console.log('ijk' + this.varVals[i][j][k]);
  }

  flattenVarVals() {
    let variableValues: VariableValue[] = [];
    this.scenarioSteps.forEach((step, i) => {
      step.actionDto.forEach((action, j) => {
        action.variables.forEach((actionVariable, k) => {
          variableValues.push(this.varVals[i][j][k]);
        });
      });
    });
    return variableValues;
  }

}
