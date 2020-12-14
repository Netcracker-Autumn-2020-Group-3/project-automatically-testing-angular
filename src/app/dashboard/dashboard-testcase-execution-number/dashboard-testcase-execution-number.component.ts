import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {GroupedTestCaseExecutionDto} from '../../model/dashboard/groupedTestCaseExecutionDto.model';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-dashboard-testcase-execution-number',
  templateUrl: './dashboard-testcase-execution-number.component.html',
  styleUrls: ['./dashboard-testcase-execution-number.component.css']
})
export class DashboardTestcaseExecutionNumberComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {}

  view: any[] = [600, 400];
  groupedTestCaseExecutions: GroupedTestCaseExecutionDto[];
  array = Array<{value: number, name: string}>();

  isEnableData = false;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'test case';
  showYAxisLabel = true;
  yAxisLabel = 'times';
  timeline = true;
  showLabels = true;

  ngOnInit(): void {
    this.dashboardService.getGroupedTestCaseExecution().subscribe(ress => {
      this.groupedTestCaseExecutions = ress;
      this.groupedTestCaseExecutions.forEach( res => {
        this.array.push({ value: res.numberOfTestCaseExecution, name: res.testCaseName});
      });
      this.isEnableData = true;
    });
  }

  onSelect(event: any) {
  }

}
