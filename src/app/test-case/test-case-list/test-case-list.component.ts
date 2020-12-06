import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';


import {TestCaseDtoForPagination} from './test-case-dto-for-pagination';
import {TestCaseService} from '../../services/test-case.service';

@Component({
  selector: 'app-test-case-list',
  templateUrl: './test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css']
})
export class TestCaseListComponent implements OnInit {

  testCases: TestCaseDtoForPagination[] = [];
  search = {
    name: '', id: '', sortField: ''
  };
  page = 1;
  numberOfPages = 1;

  constructor(private testCaseService: TestCaseService) {
  }
  ngOnInit(): void {
    this.testCaseService.countPages().subscribe(data => {
      this.numberOfPages = data;
    }, error => {
      console.log(error);
    });
    this.onSearchSubmit();
  }

  getParams() {
    let params = new HttpParams().append('page', this.page.toString(10));
    Object.entries(this.search).forEach(([key, value]) => {
      if (value != null && value !== '') {
        params = params.append(key, value);
      }
    });
    return params;
  }

  onSelect(testCase: TestCaseDtoForPagination) {
    console.log(testCase);
    // TODO route to edit page
  }

  onSearchSubmit() {
    this.page = 1;
    this.testCaseService.getPage(this.getParams()).subscribe(data => {
      this.testCases = data.map(testScenario => {
        console.log(testScenario);
        return testScenario;
      });
    }, error => {
      console.log(error);
    });
  }

  onNextPage() {
    if (this.page !== this.numberOfPages) {
      this.page += 1;
      this.testCaseService.getPage(this.getParams()).subscribe(data => {
        this.testCases = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onPreviousPage() {
    if (this.page !== 1) {
      this.page -= 1;
      this.testCaseService.getPage(this.getParams()).subscribe(data => {
        this.testCases = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onFirstPage() {
    this.page = 1;
    this.testCaseService.getPage(this.getParams()).subscribe(data => {
      this.testCases = data;
    }, error => {
      console.log(error);
    });
  }

  onLastPage() {
    this.page = this.numberOfPages;
    this.testCaseService.getPage(this.getParams()).subscribe(data => {
      this.testCases = data;
    }, error => {
      console.log(error);
    });
  }
}
