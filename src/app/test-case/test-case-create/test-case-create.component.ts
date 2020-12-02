import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import {ScenarioStep} from '../../model/test-case/scenario-step';
import {VariableValue} from '../../model/test-case/variable-value';
import {DataEntry} from '../../model/test-case/data-entry';
import {Scenario} from '../../model/test-case/scenario';
import {DataSet} from '../../model/test-case/data-set';
import {ActionDto} from '../../model/test-case/action-dto';
import {TestCaseService} from '../../services/test-case.service';
import {ActivatedRoute} from '@angular/router';
import {TestCaseBodyComponent} from '../test-case-body/test-case-body.component';


@Component({
  selector: 'app-test-case-create',
  templateUrl: './test-case-create.component.html',
  styleUrls: ['./test-case-create.component.css']
})
export class TestCaseCreateComponent implements OnInit, AfterViewInit {


  testCaseName = '';
  scenarioId = -1;
  datasetId = -1;
  scenarios: Scenario[] = [];
  datasets: DataSet[] = [];
  showForm = false;

  @ViewChild(TestCaseBodyComponent)
  formBody: TestCaseBodyComponent;

  scenarioSteps: ScenarioStep[] = [];
  dataEntries: DataEntry[] = [];
  varVals: VariableValue[][][] = [];
  variableValues: VariableValue[] = [];

  constructor(private route: ActivatedRoute, private testCaseService: TestCaseService){

  }
  ngAfterViewInit() {
    this.formBody.scenarioSteps = [];
    this.formBody.dataEntries = [];
    this.formBody.varVals = [];
  }

  ngOnInit(): void {
    this.testCaseService.getTestScenarioList().subscribe(data => {
      this.scenarios = data;
    }, error => {
    });

    this.testCaseService.getDataSetList().subscribe(data => {
      this.datasets = data;
    }, error => {
    });

  }

  onScenarioChosen() {
    this.testCaseService.getTestScenarioSteps(this.scenarioId).subscribe(data => {
      this.scenarioSteps = data;
      console.log(this.scenarioSteps);
      this.formBody.scenarioSteps = this.scenarioSteps;
      console.log(this.formBody.scenarioSteps);
    });
    if (this.formBody.dataEntries !== undefined && this.formBody.dataEntries.length !== 0) {
      this.formBody.showForm = true;
      this.formBody.initVarVals();
    }
  }

  onDatasetChosen() {
    this.testCaseService.getDataSetEntries(this.datasetId).subscribe(data => {
      console.log('entries: ' + data);
      this.formBody.dataEntries = data;
    });
    if (this.formBody.scenarioSteps !== undefined && this.formBody.scenarioSteps.length !== 0) {
      this.formBody.showForm = true;
      this.formBody.initVarVals();
      console.log(this.showForm);
    }
  }

  onSubmit() {
    this.variableValues = this.formBody.flattenVarVals();
    let projectId;
    this.route.paramMap.subscribe(value => {
      projectId = value.get('project_id');
    });
    console.log('project id: ' + projectId);
    if (projectId !== undefined ) {
      this.testCaseService.postTestCase(this.testCaseName,
        projectId, this.datasetId, this.scenarioId, this.variableValues);
      console.log(this.testCaseName,
        projectId, this.datasetId, this.scenarioId, this.variableValues);
    } else{
      console.log('project id undefined: ' + projectId);
    }
  }

}
