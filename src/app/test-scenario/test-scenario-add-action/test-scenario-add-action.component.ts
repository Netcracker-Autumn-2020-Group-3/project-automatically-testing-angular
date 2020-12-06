import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TestScenarioService} from '../../services/test-scenario.service';
import {EntityIdName} from '../../model/test-scenario/EntityIdName';
import {TestScenarioItem} from '../../model/test-scenario/TestScenarioItem';

@Component({
  selector: 'app-test-scenario-add-action',
  templateUrl: './test-scenario-add-action.component.html',
  styleUrls: ['./test-scenario-add-action.component.css']
})
export class TestScenarioAddActionComponent implements OnInit {

  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventCancel: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('actionName') elemRef: ElementRef;
  @Input() actions: EntityIdName[];

  constructor(private testScenarioService: TestScenarioService) {
  }

  ngOnInit(): void {
  }

  getAllActionsWithIdAndName(): void {
    this.testScenarioService.getAllActionsWithIdAndName()
      .subscribe(actions => this.actions = actions,
        error => {
          console.log(error);
        }
      );
  }

  cancelAction() {
    this.eventCancel.emit();
  }

  createAction() {
    const actionName = this.elemRef.nativeElement.value;
    const action = new TestScenarioItem();
    action.id = (this.actions.filter(a => a.name === actionName).pop() as EntityIdName).id;
    action.type = 'Action';
    this.eventCreated.emit({action, actionName});
  }

}
