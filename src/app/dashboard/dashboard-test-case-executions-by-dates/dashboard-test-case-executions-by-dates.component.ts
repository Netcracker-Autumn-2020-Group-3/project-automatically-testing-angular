import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {TestCaseExecutionsByDates} from '../../model/dashboard/test-case-executions-by-dates';

@Component({
  selector: 'app-dashboard-test-case-executions-by-dates',
  templateUrl: './dashboard-test-case-executions-by-dates.component.html',
  styleUrls: ['./dashboard-test-case-executions-by-dates.component.css']
})
export class DashboardTestCaseExecutionsByDatesComponent implements OnInit {

  testCaseExecutionsByDates: TestCaseExecutionsByDates[];

  constructor(private service: DashboardService) {
  }

  ngOnInit(): void {
  }


  getTestCaseExecutionsByDates() {
    this.service.getTestCaseExecutionsByDates(10).subscribe(data => {
      console.log('data tes case exec by dates : ' + data);
      this.testCaseExecutionsByDates = data;
    });
  }

}
