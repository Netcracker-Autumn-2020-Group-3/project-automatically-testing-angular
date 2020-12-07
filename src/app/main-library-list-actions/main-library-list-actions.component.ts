import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Action} from '../model/action.model';
import {ListActionsComponent} from './list-actions/list-actions.component';
import {LibraryActionService} from '../services/library-action.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-main-library-list-actions',
  templateUrl: './main-library-list-actions.component.html',
  styleUrls: ['./main-library-list-actions.component.css']
})
export class MainLibraryListActionsComponent implements OnInit {

  @ViewChild('buttonActions') elemRefButActions: ElementRef;
  @ViewChild('buttonCompounds') elemRefButCompounds: ElementRef;
  isButtonActions = true;
  isButtonCompounds = false;
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
    this.elemRefButActions.nativeElement.classList.add('active');
    this.elemRefButCompounds.nativeElement.classList.remove('active');
  }

  clickButtonCompounds() {
    this.isButtonActions = false;
    this.isButtonCompounds = true;
    this.elemRefButActions.nativeElement.classList.remove('active');
    this.elemRefButCompounds.nativeElement.classList.add('active');
  }
}
