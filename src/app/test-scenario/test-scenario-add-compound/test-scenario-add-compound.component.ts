import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TestScenarioService} from '../../services/test-scenario.service';
import {TestScenarioItem} from '../../model/test-scenario/TestScenarioItem';
import {EntityIdName} from '../../model/test-scenario/EntityIdName';

@Component({
  selector: 'app-test-scenario-add-compound',
  templateUrl: './test-scenario-add-compound.component.html',
  styleUrls: ['./test-scenario-add-compound.component.css']
})
export class TestScenarioAddCompoundComponent implements OnInit {

  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventCancel: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('compoundName') elemRef: ElementRef;
  @Input() compounds: EntityIdName[];

  constructor(private testScenarioService: TestScenarioService) {
  }

  ngOnInit(): void {
  }

  getAllCompoundsWithIdAndName() {
    this.testScenarioService.getAllCompoundsWithIdAndName()
      .subscribe(
        compounds => this.compounds = compounds,
        error => console.log(error)
      );
  }

  cancelCompound() {
    this.eventCancel.emit();
  }

  createCompound() {
    const compoundName = this.elemRef.nativeElement.value;
    const compound = new TestScenarioItem();
    compound.id = (this.compounds.filter(c => c.name === compoundName).pop() as EntityIdName).id;
    compound.type = 'Compound';
    this.eventCreated.emit({compound, compoundName});
  }

}
