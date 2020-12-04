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
export class TestCaseEditComponent implements OnInit, AfterViewInit {

  scenarioStepsWithData: ScenarioStep[];
  dataEntries: DataEntry[];
  variableValues: VariableValue[] = [];
  testCase: TestCaseDto;
  testCaseId: number;
  showForm = false;

  @ViewChild(TestCaseBodyComponent)
  formBody: TestCaseBodyComponent;

  constructor(private route: ActivatedRoute, private testCaseService: TestCaseService) {

  }

  ngAfterViewInit() {
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


    console.log('GETTTTTING TEST CAE' + this.testCaseId);
    // get test case by id
    this.testCaseService.getTestCaseById(this.testCaseId).subscribe(data => {
      this.testCase = data;
      this.scenarioStepsWithData = this.testCase.scenarioStepsWithData;

      // get test case dataset entries
      this.testCaseService.getDataSetEntries(this.testCase.testCase.dataSetId).subscribe(dataEntries => {
        this.dataEntries = dataEntries;
        this.ngAfterViewInit();
      });
      this.showForm = true;

    });

  }

  onSubmit() {
    this.variableValues = this.formBody.flattenVarVals();
    let projectId;
    this.route.paramMap.subscribe(value => {
      projectId = value.get('project_id');
    });
    console.log('project id: ' + projectId);
    if (projectId !== undefined) {
      this.testCaseService.updateTestCase(this.testCase);
    } else {
      console.log('project id undefined: ' + projectId);
    }
  }
}
