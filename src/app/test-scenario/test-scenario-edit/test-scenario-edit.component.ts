import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TestScenarioService} from '../../services/test-scenario.service';
import {TestScenarioDto} from '../test-scenario-list/test-scenario-dto';

@Component({
  selector: 'app-test-scenario-edit',
  templateUrl: './test-scenario-edit.component.html',
  styleUrls: ['./test-scenario-edit.component.css']
})
export class TestScenarioEditComponent implements OnInit {

  @Input() currentTestScenario: TestScenarioDto;
  @Output() eventUpdated: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('newName') inputElemRef: ElementRef;
  isValidName = true;
  isCreated = false;
  form = new FormGroup({
    newName: new FormControl('', [Validators.required]),
    isArchived: new FormControl('False')
  });

  constructor(private testScenarioService: TestScenarioService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  // TODO исправить комментарий
  updateTestScenario() {
    // const id = +this.currentTestScenario.id;
    const id = 18;
    const name = (this.form.get('newName') as FormControl).value;
    const archived = (this.form.get('isArchived') as FormControl).value;
    this.testScenarioService.updateTestScenarioById({id, name, archived})
      .subscribe(response => {
        this.checkValidTestScenarioName(response.body);
      });
  }

  private checkValidTestScenarioName(isCreated: boolean | null) {
    if (isCreated) {
      this.finishUpdateTestScenario();
    } else {
      this.turnOffValidName();
    }
  }

  private finishUpdateTestScenario() {
    this.isCreated = true;
    setTimeout(() => {
      this.eventUpdated.emit();
    }, 2000);
  }

  cancelTestScenario() {
    this.eventUpdated.emit();
  }
  private turnOffValidName() {
    this.renderer.addClass(this.inputElemRef.nativeElement, 'invalidInputForm');
    this.isValidName = false;
  }
}
