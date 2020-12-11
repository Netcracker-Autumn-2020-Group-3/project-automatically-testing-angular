import { Component, OnInit } from '@angular/core';
import {TestCaseExecutionService} from "../services/test-case-execution.service";
import {TestCaseExecutionWithFailedActionNumber} from "../model/testCaseExecutionWithFailedActionNumber";

@Component({
  selector: 'app-list-of-test-case-execution',
  templateUrl: './list-of-test-case-execution.component.html',
  styleUrls: ['./list-of-test-case-execution.component.css']
})
export class ListOfTestCaseExecutionComponent implements OnInit {

  testCaseExecutions: TestCaseExecutionWithFailedActionNumber[];

  start: number;
  end: number;
  step: number = 5;
  searchedTestCaseExecution: any;

  constructor(private service: TestCaseExecutionService) { }

  ngOnInit(): void {
    this.getAllTestCaseExecution().subscribe(data => this.testCaseExecutions = data);
    this.start = 0;
    this.end = this.step;
  }

  previousPage() {
    if(this.start != 0) {
      this.start = this.start - this.step;
      this.end = this.end - this.step;
    }
  }
  nextPage() {
    if(this.end <= this.testCaseExecutions.length - 1) {
      this.start = this.start + this.step;
      this.end = this.end + this.step;
    }
  }

  getAllTestCaseExecution() {
    return this.service.getAllTestCaseExecutionWithFailedActionNumber();
  }
}
