import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TestScenarioService} from '../../services/test-scenario.service';
import {TestScenarioItem} from '../../model/test-scenario/TestScenarioItem';
import {Action} from '../../model/test-scenario/Action';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-test-scenario-add-action',
  templateUrl: './test-scenario-add-action.component.html',
  styleUrls: ['./test-scenario-add-action.component.css']
})
export class TestScenarioAddActionComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventCancel: EventEmitter<any> = new EventEmitter<any>();
  @Input() actions: Action[];
  @Input() currentPriority: number;
  init = false;
  currentActionName: string;
  currentAction: Action;
  currentVariableText: string | null = null;

  constructor(private testScenarioService: TestScenarioService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllActionsWithIdAndName(): void {
    this.subscription.add(
      this.testScenarioService.getAllActions()
        .subscribe(actions => this.actions = actions,
          error => console.log(error)
        )
    );
  }

  cancelAction() {
    this.eventCancel.emit();
  }

  createAction() {
    const action = new TestScenarioItem();
    action.id = this.currentAction.id;
    action.contextInstanceName = this.currentVariableText;
    action.type = 'Action';
    this.eventCreated.emit({action, actionName: this.currentActionName});
  }

  setAction() {
    this.currentAction = this.getActionByName(this.currentActionName);
    this.init = true;
  }

  private getActionByName(name: string): Action {
    return this.actions.filter(a => a.name === name).pop() as Action;
  }

}
