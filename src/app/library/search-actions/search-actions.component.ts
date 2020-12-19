import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {ListActionsComponent} from '../list-actions/list-actions.component';
import {Action} from '../../model/action.model';
import {LibraryActionService} from '../../services/library-action.service';
import {HttpParams} from '@angular/common/http';
import {CreateCompoundActionsComponent} from '../../create-compound/create-compound-actions/create-compound-actions.component';

@Component({
  selector: 'app-search-actions',
  templateUrl: './search-actions.component.html',
  styleUrls: ['./search-actions.component.css']
})
export class SearchActionsComponent implements OnInit {

  @Input()createCompoundSearchActions = false;
  @Output()createActionsCompound = new EventEmitter<any>();

  actionName: string;
  @Output()actions = new EventEmitter<Action[]>();
  pageNumber: number;
  @Output()numberOfPages = new EventEmitter<number>();
  pageSize = 5;
  @Input()orderSearch = 'id';
  @Input()orderSort: string;

  constructor(private listActionsComponent: ListActionsComponent, private actionService: LibraryActionService) { }

  ngOnInit(): void {

  }

  searchAction(){
     if (this.actionName === '' && this.orderSearch === ''){
       this.ngOnInit();
     }else{
       console.log(this.orderSearch);
       this.pageNumber = 1;
       const param = new HttpParams()
         .append('page', String(this.pageNumber))
         .append('orderSearch', String(this.orderSearch))
         .append('orderSort', String(this.orderSort))
         .append('pageSize', String(this.pageSize));
       this.actionService.getActionsByName(param, this.actionName).subscribe((response => {
         this.actions.emit(response);
         this.numberOfPages.emit(response.length);
       }));
     }
   }
  getOrderSearch() {
    this.pageNumber = 1;
    this.actionService.getNumberOfActions().subscribe(( res => {
      this.numberOfPages.emit(Math.round(res / this.pageSize));
    }));
    const param = new HttpParams()
      .append('page', String(this.pageNumber))
      .append('orderSearch', String(this.orderSearch))
      .append('pageSize', String(this.pageSize));
    this.actionService.getActions(param).subscribe(( res => {
      this.actions.emit(res);
    }));
  }

  getAllActions() {
    this.createActionsCompound.emit();
  }
}
