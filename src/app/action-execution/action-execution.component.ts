import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionExecutionService} from '../services/action-execution.service';
import {ActionExecutionDto} from '../model/action-execution-dto';
import {ReportService} from '../services/report.service';
import {Subscription} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action-execution',
  templateUrl: './action-execution.component.html',
  styleUrls: ['./action-execution.component.css']
})
export class ActionExecutionComponent implements OnInit, OnDestroy{

  subscription: Subscription = new Subscription();
  testCaseExecutionId: any;
  actionExecution: ActionExecutionDto[];
  actionsForReport: ActionExecutionDto[];
  status: string;
  orderSort = 'ASC';
  quantityPages: number;
  quantity: number;
  offset = 0;
  currentPage = 1;
  currentPageSize = 7;
  currentSearch = '';
  orderSearch = 'action_execution_id';

  constructor(private actionExecutionService: ActionExecutionService,
              private route: ActivatedRoute,
              private reportService: ReportService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.testCaseExecutionId = value.get('test_case_execution_id');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getParams(){
    return new HttpParams()
      .append('page', String(this.currentPage))
      .append('orderSearch', String(this.orderSearch))
      .append('orderSort', String(this.orderSort))
      .append('pageSize', String(this.currentPageSize))
      .append('search', String(this.currentSearch));
  }

  getParamsForReport(){
    return new HttpParams()
      .append('page', String(this.currentPage))
      .append('orderSearch', String(this.orderSearch))
      .append('orderSort', String(this.orderSort))
      .append('pageSize', String(this.quantity))
      .append('search', String(this.currentSearch));
  }

  getActionExecutions(){
    this.subscription.add(
      this.actionExecutionService.getAllActionsExecution(this.testCaseExecutionId, this.getParams()).subscribe(res => {
        this.actionExecution = res;
      })
    );
  }

  getEventClickSearch(search: string) {
    this.currentSearch = search;
    this.getQuantityPages();
    this.getActionExecutions();
  }


  getEventChangePage(page: number) {
    this.currentPage = page;
    this.offset = (this.currentPage - 1) * this.currentPageSize;
    this.getQuantityPages();
    this.getActionExecutions();
  }

  getQuantityPages() {
    this.subscription.add(
      this.actionExecutionService.getQuantityActionsExecutions(this.currentSearch, this.testCaseExecutionId)
        .subscribe(quantity => {
          this.quantityPages = Math.ceil(quantity / this.currentPageSize);
          this.quantity = quantity;
          }
        ));
  }

  sendReport() {
    this.subscription.add(
      this.actionExecutionService.getAllActionsExecution(this.testCaseExecutionId, this.getParamsForReport()).subscribe(res => {
        this.actionsForReport = res;
        this.reportService.sendReport(this.testCaseExecutionId, this.actionsForReport).subscribe(status => {
            this.alertReport(status);
          });
      })
    );
  }

  alertReport(status: string) {
    Swal.fire({icon: status === 'OK' ? 'success' : 'error',
      title: status === 'OK' ? 'success' : 'error',
      text: status === 'OK' ? 'Email was send successfully!' : status === 'NO_CONTENT' ? 'No subscribers' : 'Emails are not correct'
    });
  }

}
