import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {TestScenarioDto} from './test-scenario-dto';
import {TestScenarioService} from '../../services/test-scenario.service';

@Component({
  selector: 'app-test-scenario-list',
  templateUrl: './test-scenario-list.component.html',
  styleUrls: ['./test-scenario-list.component.css']
})
export class TestScenarioListComponent implements OnInit {

  testScenarios: TestScenarioDto[] = [];
  search = {
    name: '', id: '', sortField: ''
  };
  page = 1;
  numberOfPages = 1;

  constructor(private testScenarioService: TestScenarioService) {
  }
  ngOnInit(): void {
    this.testScenarioService.countPages().subscribe(data => {
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

  onSelect(testScenario: TestScenarioDto) {
    console.log(testScenario);
    // TODO route to edit page
  }

  onSearchSubmit() {
    this.page = 1;
    this.testScenarioService.getPage(this.getParams()).subscribe(data => {
      this.testScenarios = data.map(testScenario => {
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
      this.testScenarioService.getPage(this.getParams()).subscribe(data => {
        this.testScenarios = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onPreviousPage() {
    if (this.page !== 1) {
      this.page -= 1;
      this.testScenarioService.getPage(this.getParams()).subscribe(data => {
        this.testScenarios = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onFirstPage() {
    this.page = 1;
    this.testScenarioService.getPage(this.getParams()).subscribe(data => {
      this.testScenarios = data;
    }, error => {
      console.log(error);
    });
  }

  onLastPage() {
    this.page = this.numberOfPages;
    this.testScenarioService.getPage(this.getParams()).subscribe(data => {
      this.testScenarios = data;
    }, error => {
      console.log(error);
    });
  }
}
