import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {TestScenarioItem} from '../../model/test-scenario/TestScenarioItem';
import {FormControl, Validators} from '@angular/forms';
import {EntityIdName} from '../../model/test-scenario/EntityIdName';
import {TestScenarioService} from '../../services/test-scenario.service';

@Component({
  selector: 'app-test-scenario-create',
  templateUrl: './test-scenario-create.component.html',
  styleUrls: ['./test-scenario-create.component.css']
})
export class TestScenarioCreateComponent implements OnInit {
  @ViewChild('inputElement') inputElemRef: ElementRef;
  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  compounds: EntityIdName[];
  actions: EntityIdName[];
  formName = new FormControl('', [Validators.required]);
  isCreated = false;
  isValidName = true;
  isAddCompound = false;
  isAddAction = false;
  items: TestScenarioItem[] = [];
  map: Map<TestScenarioItem, string> = new Map<TestScenarioItem, string>();

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
    this.map.set(itemNew, itemName);
  }

  deleteItemFromTestScenario(item: TestScenarioItem) {
    this.map.delete(item);
    const index = (this.items as TestScenarioItem[]).indexOf(item);
    this.items = (this.items as TestScenarioItem[]).filter(a => a !== item);
    for (let i: number = index; i < this.items.length; i++) {
      this.items[i].priority -= 1;
    }
  }

  private setCompounds(): void {
    this.testScenarioService.getAllCompoundsWithIdAndName()
      .subscribe(compounds => this.compounds = compounds);
  }

  private setActions(): void {
    this.testScenarioService.getAllActionsWithIdAndName()
      .subscribe(actions => this.actions = actions);
  }

  createTestScenario() {
    const name = this.formName.value;
    this.testScenarioService.createTestScenario({name, items: this.items})
      .subscribe(resp => {
        this.checkValidTestScenarioName(resp.body);
      });
  }

  private checkValidTestScenarioName(isCreated: boolean | null) {
    if (isCreated) {
      this.cancelTestScenario();
    } else {
      this.turnOffValidName();
    }
  }

  cancelTestScenario() {
    this.cancelActionForm();
    this.cancelCompoundForm();
    this.formName.reset();
    this.items = [];
    this.isCreated = true;
    this.map.clear();
    setTimeout(() => {
      this.isCreated = false;
      this.eventCreated.emit();
    }, 2000);
  }

  turnOnValidName() {
    this.renderer.removeClass(this.inputElemRef.nativeElement, 'invalidInputForm');
    this.isValidName = true;
  }

  private turnOffValidName() {
    this.renderer.addClass(this.inputElemRef.nativeElement, 'invalidInputForm');
    this.isValidName = false;
  }

}
