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

  search = {
    testCaseName: '', projectName: '', status: '', sortField: 'id', pageSize: '3', sortOrder: 'ASC'
  };

  step: number = 15;

  start: number = 0;
  end: number = this.step;
  orderByValue: string = 'id';
  orderByClause: string = 'ASC';

  searchedTestCaseExecution: any;
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
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause).subscribe(data => this.testCaseExecutions = data);
  }

  getAllTestCaseExecution(limit: number, offset: number, orderBy: string, orderBuClause: string) {
    return this.service.getAllTestCaseExecutionWithFailedActionNumber(limit, offset, orderBy, orderBuClause);
  }

  countTestCaseExecutions() {
    return this.service.countTestCaseExecutions();
  }

  previousPage() {
    if(this.start != 0) {
      this.start = this.start - this.step;
      this.end = this.end - this.step;
      this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause).subscribe(data => this.testCaseExecutions = data);
    }
  }

  nextPage() {
    if(this.end <= this.numberOfTestCaseExecution - 1) {
      this.start = this.start + this.step;
      this.end = this.end + this.step;
      this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause).subscribe(data => this.testCaseExecutions = data);
    }
  }

  onPage(index: number) {
    this.start = index * this.step;
    this.end = this.step + index * this.step;
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause).subscribe(data => this.testCaseExecutions = data);
  }
  onSearchSubmit() {

  }
  /*orderBy(column: string, orderByClause: string) {
    this.orderByValue = column;
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue).subscribe(data => this.testCaseExecutions = data);
  }*/
  orderBy(value: string) {
    this.orderByClause = value.split(".")[0];
    this.orderByValue = value.split(".")[1];
    this.getAllTestCaseExecution(this.step, this.start, this.orderByValue, this.orderByClause).subscribe(data => this.testCaseExecutions = data);
  }
}
