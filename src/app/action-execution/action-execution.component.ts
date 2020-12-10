import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionExecutionService} from '../services/action-execution.service';
import {ActionExecutionDto} from '../model/action-execution-dto';

@Component({
  selector: 'app-action-execution',
  templateUrl: './action-execution.component.html',
  styleUrls: ['./action-execution.component.css']
})
export class ActionExecutionComponent implements OnInit {

  testCaseExecutionId: any;
  actionExecution: ActionExecutionDto[];

  constructor(private actionExecutionService: ActionExecutionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.testCaseExecutionId = value.get('test_case_execution_id');
    });
    this.actionExecutionService.getAllActionsExecution(this.testCaseExecutionId).subscribe(res => {
      this.actionExecution = res;
      console.log(this.actionExecution);
    });
  }

}
