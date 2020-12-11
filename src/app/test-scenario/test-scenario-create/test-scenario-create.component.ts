import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {TestScenarioItem} from '../../model/test-scenario/TestScenarioItem';
import {FormControl, Validators} from '@angular/forms';
import {TestScenarioService} from '../../services/test-scenario.service';
import {Compound} from '../../model/test-scenario/Compound';
import {Action} from '../../model/test-scenario/Action';

@Component({
  selector: 'app-test-scenario-create',
  templateUrl: './test-scenario-create.component.html',
  styleUrls: ['./test-scenario-create.component.css']
})
export class TestScenarioCreateComponent implements OnInit {
  @ViewChild('inputElement') inputElemRef: ElementRef;
  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  formName = new FormControl('', [Validators.required]);
  compounds: Compound[];
  actions: Action[];
  items: TestScenarioItem[] = [];

  mapItemNames: Map<TestScenarioItem, string> = new Map<TestScenarioItem, string>();
  isCreated = false;
  isValidName = true;

  isAddCompound = false;
  isAddAction = false;

  constructor(private testScenarioService: TestScenarioService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setCompounds();
    this.setActions();
  }

  addActionForm() {
    this.isAddAction = true;
    this.cancelCompoundForm();
  }

  addCompoundForm() {
    this.isAddCompound = true;
    this.cancelActionForm();
  }

  cancelActionForm() {
    this.isAddAction = false;
  }

  cancelCompoundForm() {
    this.isAddCompound = false;
  }

  addActionToTestScenario(params: {action: TestScenarioItem, actionName: string}) {
    this.addItemToTestScenario(params.action, params.actionName);
    this.cancelActionForm();
  }

  addCompoundToTestScenario(params: {compound: TestScenarioItem, compoundName: string}) {
    this.addItemToTestScenario(params.compound, params.compoundName);
    this.cancelCompoundForm();
  }

  private addItemToTestScenario(item: TestScenarioItem, itemName: string) {
    const itemNew = item;
    itemNew.priority = (this.items as TestScenarioItem[]).length + 1;
    (this.items as TestScenarioItem[]).push(itemNew);
    this.mapItemNames.set(itemNew, itemName);
  }

  deleteItemFromTestScenario(item: TestScenarioItem) {
    this.mapItemNames.delete(item);
    const index = (this.items as TestScenarioItem[]).indexOf(item);
    this.items = (this.items as TestScenarioItem[]).filter(a => a !== item);
    for (let i: number = index; i < this.items.length; i++) {
      this.items[i].priority -= 1;
    }
  }

  private setCompounds(): void {
    this.testScenarioService.getAllCompounds()
      .subscribe(compounds => this.compounds = compounds);
  }

  private setActions(): void {
    this.testScenarioService.getAllActions()
      .subscribe(actions => this.actions = actions);
  }

  createTestScenario() {
    const name = this.formName.value;
    console.log({name, items: this.items});
    this.testScenarioService.createTestScenario({name, items: this.items})
      .subscribe(resp => {
        this.checkValidTestScenarioName(resp.body);
      });
  }

  private checkValidTestScenarioName(isCreated: boolean | null) {
    if (isCreated) {
      this.finishCreateTestScenario();
    } else {
      this.turnOffValidName();
    }
  }

  private finishCreateTestScenario() {
    this.cancelActionForm();
    this.cancelCompoundForm();
    this.formName.reset();
    this.items = [];
    this.isCreated = true;
    this.mapItemNames.clear();
    setTimeout(() => {
      this.isCreated = false;
      this.eventCreated.emit();
    }, 2000);
  }

  cancelTestScenario() {
    this.eventCreated.emit();
  }

  turnOnValidName() {
    this.renderer.removeClass(this.inputElemRef.nativeElement, 'invalidInputForm');
    this.isValidName = true;
  }

  private turnOffValidName() {
    this.renderer.addClass(this.inputElemRef.nativeElement, 'invalidInputForm');
    this.isValidName = false;
  }

  getCurrentPriority() {
    return this.items.length + 1;
  }

}
