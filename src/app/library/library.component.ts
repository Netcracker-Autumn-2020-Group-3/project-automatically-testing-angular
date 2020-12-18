import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Action} from '../model/action.model';
import {ListActionsComponent} from './list-actions/list-actions.component';
import {LibraryActionService} from '../services/library-action.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-main-library-list-actions',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  @ViewChild('buttonActions') elemRefButActions: ElementRef;
  @ViewChild('buttonCompounds') elemRefButCompounds: ElementRef;
  @ViewChild('buttonCreateAction') elemRefButCreateAction: ElementRef;
  @ViewChild('buttonCreateCompound') elemRefButCreateCompound: ElementRef;
  isButtonActions = true;
  isButtonCompounds = false;
  isButtonCreateAction = false;
  isButtonCreateCompound = false;
  actionName: string;
  actions: Action[];
  pageNumber: number;
  numberOfPages: number;
  pageSize = 5;
  orderSearch = '';

  constructor(private listActionsComponent: ListActionsComponent, private actionService: LibraryActionService) { }

  ngOnInit(): void {
    this.pageNumber = 1;

    this.actionService.getNumberOfActions().subscribe(( res => {
      this.numberOfPages = Math.round(res / this.pageSize);
    }));

    const param = new HttpParams()
      .append('page', String(this.pageNumber))
      .append('orderSearch', String(this.orderSearch))
      .append('pageSize', String(this.pageSize));
    this.actionService.getActions(param).subscribe(( res => {
      this.actions = res;
    }));
  }

  getActionsFromSearch(actionsSearch: Action[]) {
    this.actions = actionsSearch;
  }

  getNumberOfPagesFromSearch(pageNumbers: number) {
    this.numberOfPages = pageNumbers;
  }

  clickButtonActions() {
    this.isButtonActions = true;
    this.isButtonCompounds = false;
    this.isButtonCreateAction = false;
    this.isButtonCreateCompound = false;
    this.elemRefButActions.nativeElement.classList.add('active');
    this.elemRefButCompounds.nativeElement.classList.remove('active');
    this.elemRefButCreateAction.nativeElement.classList.remove('active');
    this.elemRefButCreateCompound.nativeElement.classList.remove('active');
  }

  clickButtonCompounds() {
    this.isButtonActions = false;
    this.isButtonCompounds = true;
    this.isButtonCreateAction = false;
    this.isButtonCreateCompound = false;
    this.elemRefButActions.nativeElement.classList.remove('active');
    this.elemRefButCompounds.nativeElement.classList.add('active');
    this.elemRefButCreateAction.nativeElement.classList.remove('active');
    this.elemRefButCreateCompound.nativeElement.classList.remove('active');
  }

  clickButtonCreateAction() {
    this.isButtonActions = false;
    this.isButtonCompounds = false;
    this.isButtonCreateAction = true;
    this.isButtonCreateCompound = false;
    this.elemRefButActions.nativeElement.classList.remove('active');
    this.elemRefButCompounds.nativeElement.classList.remove('active');
    this.elemRefButCreateAction.nativeElement.classList.add('active');
    this.elemRefButCreateCompound.nativeElement.classList.remove('active');
  }

  clickButtonCreateCompound() {
    this.isButtonActions = false;
    this.isButtonCompounds = false;
    this.isButtonCreateAction = false;
    this.isButtonCreateCompound = true;
    this.elemRefButActions.nativeElement.classList.remove('active');
    this.elemRefButCompounds.nativeElement.classList.remove('active');
    this.elemRefButCreateAction.nativeElement.classList.remove('active');
    this.elemRefButCreateCompound.nativeElement.classList.add('active');
  }
}
