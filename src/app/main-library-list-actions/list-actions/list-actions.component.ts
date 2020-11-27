import { Component, Input, OnInit } from '@angular/core';
import {Action} from './action.model';
import {LibraryActionService} from '../../services/library-action.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

    @Input()actions: Action[];
    @Input()pageNumbers: number;
    @Input()numberOfPages: number;
    @Input()pageSize: number;

    p = 1;

  constructor(private actionService: LibraryActionService) { }

  ngOnInit(): void {
  }

  getListOfActions(page: number){
    const param = new HttpParams().append('page', String(page));
    param.append('pageSize', String(this.pageSize));
    this.actionService.getActions(param).subscribe(( res => {
      this.actions = res;
    }));
  }

  getPage(page: number){
    this.getListOfActions(page);
    this.pageNumbers = page;
  }

  getPrevious(){
    if (this.pageNumbers !== 1){
      this.getListOfActions(this.pageNumbers - 1);
      this.pageNumbers -= 1;
    }
  }
  getNext(){
    if (this.pageNumbers !== this.numberOfPages){
      this.getListOfActions(this.pageNumbers + 1);
      this.pageNumbers += 1;
    }
  }

}

