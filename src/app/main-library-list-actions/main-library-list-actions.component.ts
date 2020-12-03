import { Component, OnInit } from '@angular/core';
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

  actionName: string;
  actions: Action[];
  pageNumber: number;
  numberOfPages: number;
  pageSize = 2;
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
}
