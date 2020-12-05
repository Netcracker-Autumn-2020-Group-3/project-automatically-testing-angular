import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test-scenario',
  templateUrl: './test-scenario.component.html',
  styleUrls: ['./test-scenario.component.css']
})
export class TestScenarioComponent implements OnInit {

  @ViewChild('buttonList') elemRefList: ElementRef;
  @ViewChild('buttonCreate') elemRefCreate: ElementRef;
  @ViewChild('buttonEdit') elemRefEdit: ElementRef;
  isActiveButtonList = false;
  isActiveButtonCreate = true;
  isActiveButtonEdit = false;

  constructor() {
  }

  ngOnInit(): void {
    this.activateButtonCreate();
  }

  clickButtonList() {
    this.activateButtonList();
    this.elemRefList.nativeElement.classList.add('active');
    this.elemRefCreate.nativeElement.classList.remove('active');
    this.elemRefEdit.nativeElement.classList.remove('active');
  }

  clickButtonCreate() {
    this.activateButtonCreate();
    this.elemRefCreate.nativeElement.classList.add('active');
    this.elemRefList.nativeElement.classList.remove('active');
    this.elemRefEdit.nativeElement.classList.remove('active');
  }

  clickButtonEdit() {
    this.activateButtonEdit();
    this.elemRefEdit.nativeElement.classList.add('active');
    this.elemRefCreate.nativeElement.classList.remove('active');
    this.elemRefList.nativeElement.classList.remove('active');
  }

  private activateButtonList() {
    this.isActiveButtonList = true;
    this.isActiveButtonCreate = false;
    this.isActiveButtonEdit = false;
  }

  private activateButtonCreate() {
    this.isActiveButtonList = false;
    this.isActiveButtonCreate = true;
    this.isActiveButtonEdit = false;
  }

  private activateButtonEdit() {
    this.isActiveButtonList = false;
    this.isActiveButtonCreate = false;
    this.isActiveButtonEdit = true;
  }

}
