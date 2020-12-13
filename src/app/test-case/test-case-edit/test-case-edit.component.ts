import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TestCaseBodyComponent} from '../test-case-body/test-case-body.component';
import {ScenarioStep} from '../../model/test-case/scenario-step';
import {DataEntry} from '../../model/test-case/data-entry';
import {VariableValue} from '../../model/test-case/variable-value';
import {ActivatedRoute} from '@angular/router';
import {TestCaseService} from '../../services/test-case.service';
import {TestCaseDto} from '../../model/test-case/test-case-dto';

@Component({
  selector: 'app-test-case-edit',
  templateUrl: './test-case-edit.component.html',
  styleUrls: ['./test-case-edit.component.css']
})
export class TestCaseEditComponent implements OnInit {

  scenarioStepsWithData: ScenarioStep[];
  dataEntries: DataEntry[];
  variableValues: VariableValue[] = [];
  testCase: TestCaseDto;
  testCaseId: number;
  showForm = false;

  showEditProgress = false;
  progressMessage = '';
  progressTypeClass = '';
  progressSuccess = 'alert-success';
  progressFail = 'alert-danger';

  @ViewChild(TestCaseBodyComponent)
  formBody: TestCaseBodyComponent;

  constructor(private route: ActivatedRoute, private testCaseService: TestCaseService) {

  }

  initBody() {
    this.formBody.scenarioSteps = this.testCase.scenarioStepsWithData;
    this.formBody.dataEntries = this.dataEntries;
    this.formBody.initVarVals();
    this.formBody.showForm = true;
  }

  ngOnInit(): void {
    // get test case id
    this.route.paramMap.subscribe(value => {
      const testCaseId = value.get('test_case_id');
      this.testCaseId = testCaseId === null ? -1 : parseInt(testCaseId, 10);
    });

    // get test case by id
    this.testCaseService.getTestCaseById(this.testCaseId).subscribe(data => {
      this.testCase = data;
      this.scenarioStepsWithData = this.testCase.scenarioStepsWithData;

      // get test case dataset entries
      this.testCaseService.getDataSetEntries(this.testCase.testCase.dataSetId).subscribe(dataEntries => {
        this.dataEntries = dataEntries;
        this.initBody();
      });
      this.showForm = true;

    });

  }

  validate() {
    if (this.testCase.testCase.name === '' || this.testCase.testCase.name === null || this.testCase.testCase.name === undefined) {
      this.progressMessage = 'Enter test case name!';
      this.progressTypeClass = this.progressFail;
      this.showEditProgress = true;
      return false;
    }
    if (this.formBody.areVariableValuesAllFilled(this.variableValues)) {
      this.progressMessage = 'Fill in all values for variables!';
      this.progressTypeClass = this.progressFail;
      this.showEditProgress = true;
      return false;
    }
    return true;
  }

  onSubmit() {
    this.variableValues = this.formBody.flattenVarVals();
    let projectId;

    if (!this.validate()) {
      return;
    }

    this.route.paramMap.subscribe(value => {
      projectId = value.get('project_id');
    });
    console.log('project id: ' + projectId);
    if (projectId !== undefined) {
      this.testCaseService.updateTestCase(
        this.testCase.testCase.name, this.testCase.testCase.id, this.variableValues
      )
        .subscribe(data => {
            this.progressMessage = 'Successfully created.';
            this.progressTypeClass = this.progressSuccess;
            this.showEditProgress = true;
          },
          error => {
            this.progressMessage = 'Error uploading data entries.';
            this.progressTypeClass = this.progressFail;
            this.showEditProgress = true;
          }
        );
    } else {
      console.log('project id undefined: ' + projectId);
    }

  }
}
