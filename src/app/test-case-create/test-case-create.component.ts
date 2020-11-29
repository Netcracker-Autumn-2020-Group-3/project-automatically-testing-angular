import {Component, OnInit} from '@angular/core';
import {ScenarioStep} from '../model/test-case/scenario-step';
import {VariableValue} from '../model/test-case/variable-value';
import {DataEntry} from '../model/test-case/data-entry';
import {Scenario} from '../model/test-case/scenario';
import {DataSet} from '../model/test-case/data-set';
import {TestCaseService} from '../services/test-case.service';


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
  scenarioId = -1;
  datasetId = -1;
  scenarios: Scenario[] = [];
  dataset: DataSet;
  datasets: DataSet[] = [];
  showForm = false;

  variableValues: VariableValue[] = [];

  constructor(private testCaseService: TestCaseService) {

  }

  ngOnInit(): void {
    this.testCaseService.getTestScenarioList().subscribe(data => {
      console.log('getTestScenarioList' + data);
      this.scenarios = data;
    }, error => {
    });

    this.testCaseService.getDataSetList().subscribe(data => {
      console.log('getDataSetList' + data);
      this.datasets = data;
    }, error => {
    });

  }

  onScenarioChosen() {

    this.testCaseService.getTestScenarioSteps(this.scenarioId).subscribe(data => {
      this.scenarioSteps = data;
    });


    if (this.dataEntries !== undefined && this.dataEntries.length !== 0) {
      this.showForm = true;
      this.initVarVals();
    }
  }

  onDatasetChosen() {

    this.testCaseService.getDataSetEntries(this.datasetId).subscribe(data => {
      this.dataEntries = data;
    });


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
        action.variables.forEach((actionVariable, k) => {
          this.varVals[i][j][k] = new VariableValue(action.id, actionVariable.id, this.scenarioId);
        });
      });
    });
  }


  onDataEntrySelect(i: number, j: number, k: number): void {
    console.log(this.varVals[i][j][k]);
  }

  onSubmit() {
    this.scenarioSteps.forEach((step, i) => {
      step.actions.forEach((action, j) => {
        action.variables.forEach((actionVariable, k) => {
          this.variableValues.push(this.varVals[i][j][k]);
        });
      });
    });

    this.testCaseService.postTestCase(this.testCaseName, 42, this.datasetId, this.scenarioId, this.variableValues);
  }

}
