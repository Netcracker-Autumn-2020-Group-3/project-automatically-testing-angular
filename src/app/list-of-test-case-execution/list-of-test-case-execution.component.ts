import { Component, OnInit } from '@angular/core';
import {TestCaseExecutionService} from "../services/test-case-execution.service";
import {TestCaseExecutionWithFailedActionNumber} from "../model/testCaseExecutionWithFailedActionNumber";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-list-of-test-case-execution',
  templateUrl: './list-of-test-case-execution.component.html',
  styleUrls: ['./list-of-test-case-execution.component.css']
})
export class ListOfTestCaseExecutionComponent implements OnInit {

  testCaseExecutions: TestCaseExecutionWithFailedActionNumber[];

  step: number = 15;
  start: number = 0;
  end: number = this.step;

  orderByValue: string = 'id';
  orderByClause: string = 'DESC';
  testCaseName: string;
  projectName: string;
  status = {passed: true, failed: true};

  numberOfTestCaseExecution: number;
  numberOfPage: number;
  pagination: any;

  constructor(private service: TestCaseExecutionService) { }

  ngOnInit(): void {
    this.countTestCaseExecutions().subscribe(data => {
      this.numberOfTestCaseExecution = data;
      this.numberOfPage = Math.ceil(this.numberOfTestCaseExecution / this.step);
      this.pagination = new Array(this.numberOfPage);
    });
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause, this.testCaseName, this.projectName).subscribe(data => this.testCaseExecutions = data);
  }

  getAllTestCaseExecution(limit: number, offset: number, orderBy: string, orderBuClause: string, testCaseName: string, projectName: string) {
    let getStatus = this.statusSearch(this.status.passed, this.status.failed);
    return this.service.getAllTestCaseExecutionWithFailedActionNumber(limit, offset, orderBy, orderBuClause, testCaseName, projectName, getStatus);
  }

  countTestCaseExecutions() {
    return this.service.countTestCaseExecutions();
  }

  previousPage() {
    if(this.start != 0) {
      this.start = this.start - this.step;
      this.end = this.end - this.step;
      this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause, this.testCaseName, this.projectName).subscribe(data => this.testCaseExecutions = data);
    }
  }

  nextPage() {
    if(this.end <= this.numberOfTestCaseExecution - 1) {
      this.start = this.start + this.step;
      this.end = this.end + this.step;
      this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause, this.testCaseName, this.projectName).subscribe(data => this.testCaseExecutions = data);
    }
  }

  onPage(index: number) {
    this.start = index * this.step;
    this.end = this.step + index * this.step;
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause, this.testCaseName, this.projectName).subscribe(data => this.testCaseExecutions = data);
  }

  onSearchSubmit() {

    if(this.testCaseName=='') {
      this.testCaseName = 'undefined';
    }
    if(this.projectName=='') {
      this.projectName = 'undefined';
    }
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause, this.testCaseName, this.projectName).subscribe(data => this.testCaseExecutions = data);
  }

  orderBy(value: string) {
    this.orderByClause = value.split(".")[0];
    this.orderByValue = value.split(".")[1];
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause, this.testCaseName, this.projectName).subscribe(data => this.testCaseExecutions = data);
  }

  statusSearch(passed: boolean, failed: boolean): string {
    if(passed && failed) {
      return  'all';
    } else if (!passed && !failed){
      return  '!all';
    }
    if(passed && !failed) {
      return 'passed';
    } else {
      return 'failed';
    }
  }
}
