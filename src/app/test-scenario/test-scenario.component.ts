import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test-scenario',
  templateUrl: './test-scenario.component.html',
  styleUrls: ['./test-scenario.component.css']
})
export class TestScenarioComponent implements OnInit {

  @ViewChild('buttonList') elemRefList: ElementRef;
  @ViewChild('buttonCreate') elemRefCreate: ElementRef;
  isActiveButtonList = true;
  isActiveButtonCreate = false;

  constructor() {
  }

  ngOnInit(): void {
    this.activateButtonList();
  }

  clickButtonList() {
    this.activateButtonList();
    this.elemRefList.nativeElement.classList.add('active');
    this.elemRefCreate.nativeElement.classList.remove('active');
  }

  clickButtonCreate() {
    this.activateButtonCreate();
    this.elemRefCreate.nativeElement.classList.add('active');
    this.elemRefList.nativeElement.classList.remove('active');
  }

  private activateButtonList() {
    this.isActiveButtonList = true;
    this.isActiveButtonCreate = false;
  }

  private activateButtonCreate() {
    this.isActiveButtonList = false;
    this.isActiveButtonCreate = true;
  }

}
