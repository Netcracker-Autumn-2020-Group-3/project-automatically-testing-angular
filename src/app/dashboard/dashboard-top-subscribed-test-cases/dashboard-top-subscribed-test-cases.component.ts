import { Component, OnInit } from '@angular/core';
import {TestCaseTopSubscribed} from '../../model/dashboard/test-case-top-subscribed';
import {TestCaseService} from '../../services/test-case.service';

@Component({
  selector: 'app-dashboard-top-subscribed-test-cases',
  templateUrl: './dashboard-top-subscribed-test-cases.component.html',
  styleUrls: ['./dashboard-top-subscribed-test-cases.component.css']
})
export class DashboardTopSubscribedTestCasesComponent implements OnInit {

  testCases: TestCaseTopSubscribed[];

  constructor(private testCaseService: TestCaseService) { }

  ngOnInit(): void {
    this.getTestCases();
  }

  getTestCases() {
    this.testCaseService.getTopFiveSubscribedTestCases()
      .subscribe(testCases => this.testCases = testCases);
  }

}
