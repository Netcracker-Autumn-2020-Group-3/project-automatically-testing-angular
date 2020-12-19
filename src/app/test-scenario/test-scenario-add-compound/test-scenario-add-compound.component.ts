import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TestScenarioService} from '../../services/test-scenario.service';
import {TestScenarioItem} from '../../model/test-scenario/TestScenarioItem';
import {Compound} from '../../model/test-scenario/Compound';
import {Action} from '../../model/test-scenario/Action';
import {ActionWithPriority} from '../../model/test-scenario/ActionWithPriority';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-test-scenario-add-compound',
  templateUrl: './test-scenario-add-compound.component.html',
  styleUrls: ['./test-scenario-add-compound.component.css']
})
export class TestScenarioAddCompoundComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventCancel: EventEmitter<any> = new EventEmitter<any>();
  @Input() actions: Action[];
  @Input() compounds: Compound[];
  compoundActions: ActionWithPriority[] = [];
  init = false;
  currentCompoundName: string;
  currentCompound: Compound;
  form = new FormGroup({
    inputs: new FormArray([])
  });

  constructor(private testScenarioService: TestScenarioService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllCompoundsWithIdAndName() {
    this.subscription.add(
      this.testScenarioService.getAllCompounds()
        .subscribe(compounds => this.compounds = compounds,
          error => console.log(error)
        )
    );
  }

  cancelCompound() {
    this.eventCancel.emit();
  }

  createCompound() {
    const compound = new TestScenarioItem();
    compound.id = this.currentCompound.id;
    compound.type = 'Compound';
    compound.items = this.getActionInstances();
    this.eventCreated.emit({compound, compoundName: this.currentCompoundName});
  }

  setCompound() {
    this.currentCompound = this.getCompoundByName(this.currentCompoundName);
    this.subscription.add(
      this.testScenarioService.getAllCompoundActionsByCompoundId(this.currentCompound.id)
        .subscribe(actions => {
          this.compoundActions = actions;
          this.addControlsToFormArray();
        }, error => console.log(error))
    );
    this.init = true;
  }

  private getActionInstances(): TestScenarioItem[] {
    const actions: TestScenarioItem[] = [];
    for (let i = 0; i < this.compoundActions.length; i++) {
      const action = new TestScenarioItem();
      const inputValue = (this.form.get('inputs') as FormArray).controls[i].value;
      action.id = this.compoundActions[i].actionId;
      action.type = 'Action';
      action.priority = this.compoundActions[i].priority;
      action.contextInstanceName = inputValue === '' ? null : inputValue;
      actions.push(action);
    }
    return actions;
  }

  private addControlsToFormArray() {
    this.compoundActions.forEach(action => {
      (this.form.get('inputs') as FormArray).push(new FormControl(
        {
          value: null,
          disabled: this.getActionVoidById(action.actionId)
        },
        [Validators.required]));
    });
  }

  private getCompoundByName(name: string): Compound {
    return this.compounds.filter(c => c.name === name).pop() as Compound;
  }

  getActionNameById(id: number): string {
    return (this.actions.filter(a => a.id === id).pop() as Action).name;
  }

  getActionVoidById(id: number): boolean {
    return (this.actions.filter(a => a.id === id).pop() as Action).void;
  }

}
