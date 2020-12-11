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
  showSaveProgress = false;
  progressMessage = '';
  progressTypeClass = '';
  progressSuccess = 'alert-success';
  progressFail = 'alert-danger';

  @ViewChild(TestCaseBodyComponent)
  formBody: TestCaseBodyComponent;

  scenarioSteps: ScenarioStep[] = [];
  dataEntries: DataEntry[] = [];
  varVals: VariableValue[][][] = [];
  variableValues: VariableValue[] = [];

  constructor(private route: ActivatedRoute, private testCaseService: TestCaseService) {

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
      this.progressMessage = 'Error uploading test scenarios. Try reloading the page.';
      this.progressTypeClass = this.progressFail;
      this.showSaveProgress = true;
    });

    this.testCaseService.getDataSetList().subscribe(data => {
      this.datasets = data;
    }, error => {
      this.progressMessage = 'Error uploading data sets. Try reloading the page.';
      this.progressTypeClass = this.progressFail;
      this.showSaveProgress = true;
    });

  }

  onScenarioChosen() {
    this.testCaseService.getTestScenarioSteps(this.scenarioId).subscribe(data => {
      this.scenarioSteps = data;
      console.log(this.scenarioSteps);
      this.formBody.scenarioSteps = this.scenarioSteps;
      console.log(this.formBody.scenarioSteps);
    }, error => {
      this.progressMessage = 'Error uploading test scenario.';
      this.progressTypeClass = this.progressFail;
      this.showSaveProgress = true;
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
    }, error => {
      this.progressMessage = 'Error uploading data entries.';
      this.progressTypeClass = this.progressFail;
      this.showSaveProgress = true;
    });
    if (this.formBody.scenarioSteps !== undefined && this.formBody.scenarioSteps.length !== 0) {
      this.formBody.showForm = true;
      this.formBody.initVarVals();
      console.log(this.showForm);
    }
  }

  onSubmit() {
    this.removeAlert();

    this.variableValues = this.formBody.flattenVarVals();
    let projectId;
    this.route.paramMap.subscribe(value => {
      projectId = value.get('project_id');
    });
    console.log('project id: ' + projectId);
    if (projectId !== undefined) {
      this.testCaseService.postTestCase(this.testCaseName,
        projectId, this.datasetId, this.scenarioId, this.variableValues).subscribe(data => {
          this.progressMessage = 'Successfully created.';
          this.progressTypeClass = this.progressSuccess;
          this.showSaveProgress = true;
        },
        error => {
          this.progressMessage = 'Error uploading data entries.';
          this.progressTypeClass = this.progressFail;
          this.showSaveProgress = true;
        }
      );
      console.log(this.testCaseName,
        projectId, this.datasetId, this.scenarioId, this.variableValues);
    } else {
      console.log('project id undefined: ' + projectId);
    }
  }

  removeAlert() {
    this.progressMessage = '';
    this.progressTypeClass = '';
    this.showSaveProgress = false;
  }

}
