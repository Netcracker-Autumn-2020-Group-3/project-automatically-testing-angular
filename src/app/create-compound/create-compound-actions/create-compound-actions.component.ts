import { Component, OnInit } from '@angular/core';
import {Action} from '../../model/action.model';
import {HttpParams} from '@angular/common/http';
import {LibraryActionService} from '../../services/library-action.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-compound-actions',
  templateUrl: './create-compound-actions.component.html',
  styleUrls: ['./create-compound-actions.component.css']
})
export class CreateCompoundActionsComponent implements OnInit {

  addedActionForCompound: Action[] = [];
  addedActionsPagination: number;
  paginationStart: number;
  paginationEnd: number;
  paginationPageNumber = 1;


  actionName: string;
  actions: Action[];
  pageNumber: number;
  numberOfPages: number;
  pageSize = 2;
  orderSearch = '';
  createCompound = true;
  actionForCompound: Action;
  createCompoundSearchActions = true;
  constructor(private actionService: LibraryActionService) { }

  ngOnInit(): void {

  }

  getAllActions() {
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

  getActionForCompound(action: Action){
    this.actionForCompound = new Action(action.actionId, action.actionName, action.actionDescription);
    this.addedActionForCompound.push(this.actionForCompound);
    this.addedActionsPagination = Math.round(this.addedActionForCompound.length / this.pageSize);
    this.getPage(this.paginationPageNumber);
  }

  getPage(num: number) {
    this.paginationEnd = num * this.pageSize;
    this.paginationStart = this.paginationEnd - this.pageSize;
  }

  deleteActionFromCompound(i: number, actionId: number) {
    this.addedActionForCompound.splice(i, 1);
    this.addedActionsPagination = Math.round(this.addedActionForCompound.length / this.pageSize);
  }

  alert() {
     Swal.fire({icon: 'error',
     title: 'Oops...',
     text: 'Something went wrong!'});
  }


  searchAction() {

  }

  getOrderSearch() {

  }

  getActionsFromSearch(ev: Action[]) {
    this.actions = ev;
  }
}
