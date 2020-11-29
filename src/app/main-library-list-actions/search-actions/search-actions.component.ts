import { Component, OnInit } from '@angular/core';
import {ListActionsComponent} from '../list-actions/list-actions.component';
import {Action} from '../list-actions/action.model';
import {LibraryActionService} from '../../services/library-action.service';
import {HttpParams} from '@angular/common/http';




@Component({
  selector: 'app-search-actions',
  templateUrl: './search-actions.component.html',
  styleUrls: ['./search-actions.component.css']
})
export class SearchActionsComponent implements OnInit {
  actionName: string;
  actions: Action[];
  pageNumber: number;
  numberOfPages: number;
  pageSize = 2;

  constructor(private listActionsComponent: ListActionsComponent, private actionService: LibraryActionService) { }

  ngOnInit(): void {
    this.pageNumber = 1;

    this.actionService.getNumberOfActions().subscribe(( res => {
      this.numberOfPages = Math.round(res / this.pageSize);
    }));

    const param = new HttpParams()
      .append('page', String(this.pageNumber))
      .append('pageSize', String(this.pageSize));
    this.actionService.getActions(param).subscribe(( res => {
      this.actions = res;
    }));
  }

  searchAction(){
     if (this.actionName === ''){
       this.ngOnInit();
     }else{
       this.pageNumber = 1;
       const param = new HttpParams()
         .append('page', String(this.pageNumber))
         .append('pageSize', String(this.pageSize));
       this.actionService.getActionsByName(param, this.actionName).subscribe((response => {
         this.actions = response;
         this.numberOfPages = response.length;
       }));
     }
   }



}
