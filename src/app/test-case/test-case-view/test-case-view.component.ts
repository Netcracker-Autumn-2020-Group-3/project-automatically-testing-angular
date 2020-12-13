import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ScenarioStep} from '../../model/test-case/scenario-step';
import {DataEntry} from '../../model/test-case/data-entry';
import {VariableValue} from '../../model/test-case/variable-value';
import {TestCaseDto} from '../../model/test-case/test-case-dto';
import {TestCaseBodyComponent} from '../test-case-body/test-case-body.component';
import {ActivatedRoute} from '@angular/router';
import {TestCaseService} from '../../services/test-case.service';

@Component({
  selector: 'app-test-case-view',
  templateUrl: './test-case-view.component.html',
  styleUrls: ['./test-case-view.component.css']
})
export class TestCaseViewComponent implements OnInit, AfterViewInit {
  scenarioStepsWithData: ScenarioStep[];
  dataEntries: DataEntry[];
  variableValues: VariableValue[] = [];
  testCase: TestCaseDto;
  testCaseId: number;
  showForm = false;

  isFollowed: boolean;

  @ViewChild(TestCaseBodyComponent)
  formBody: TestCaseBodyComponent;

  constructor(private route: ActivatedRoute, private testCaseService: TestCaseService) {

  }

  ngAfterViewInit() {
    this.formBody.scenarioSteps = this.testCase.scenarioStepsWithData;
    this.formBody.dataEntries = this.dataEntries;
    this.formBody.initVarVals();
    this.formBody.showForm = true;
    this.formBody.onlyView = true;
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

      const dataEntriesFlatten: DataEntry[] = [];
      this.scenarioStepsWithData.forEach(step => {
        step.actionDto.forEach(action => {
          action.variables.forEach(variable => {
            dataEntriesFlatten.push(variable.dataEntry === undefined ? new DataEntry(-1, '', -1, '') : variable.dataEntry);
          });
        });
      });
      this.dataEntries = dataEntriesFlatten;

      this.testCaseService.isFollowed(this.testCaseId).subscribe(data => {
        this.isFollowed = data;
      });

      // this.ngAfterViewInit();
      this.showForm = true;

    });

  }

  onFollowButton() {
    if (this.isFollowed) {
      this.testCaseService.unfollow(this.testCaseId).subscribe();
      this.isFollowed = false;
    } else {
      this.testCaseService.follow(this.testCaseId).subscribe();
      this.isFollowed = true;
    }
  }

}
