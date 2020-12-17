import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TestScenarioService} from '../../services/test-scenario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TestScenarioWithIdNameArchived} from '../../model/test-scenario/TestScenarioWithIdNameArchived';

@Component({
  selector: 'app-test-scenario-edit',
  templateUrl: './test-scenario-edit.component.html',
  styleUrls: ['./test-scenario-edit.component.css']
})
export class TestScenarioEditComponent implements OnInit {

  @ViewChild('newName') inputElemRef: ElementRef;
  currentTestScenario: TestScenarioWithIdNameArchived = {id: 0, name: '', archived: false};
  isValidName = true;
  isCreated = false;
  form = new FormGroup({
    newName: new FormControl('', [Validators.required]),
    isArchived: new FormControl('False')
  });

  constructor(private testScenarioService: TestScenarioService,
              private renderer: Renderer2,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.testScenarioService.getTestScenarioById(parseInt(params.get('id') as string, 0))
        .subscribe(scenarios => this.currentTestScenario = scenarios[0]);
    });
  }

  updateTestScenario() {
    const name = (this.form.get('newName') as FormControl).value;
    const archived = (this.form.get('isArchived') as FormControl).value;
    this.testScenarioService.updateTestScenarioById({id: this.currentTestScenario.id, name, archived})
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
      this.router.navigate(['/test-scenario']).then();
    }, 2000);
  }

  cancelTestScenario() {
  }
  private turnOffValidName() {
    console.log('TURN OFF');
    this.renderer.addClass(this.inputElemRef.nativeElement, 'invalidInputForm');
    this.isValidName = false;
  }

  changeValid() {
    this.isValidName = true;
    this.renderer.removeClass(this.inputElemRef.nativeElement, 'invalidInputForm');
  }
}
