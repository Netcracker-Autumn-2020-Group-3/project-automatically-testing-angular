import { Component, OnInit } from '@angular/core';
import {ListActionsComponent} from '../list-actions/list-actions.component';
import {Action} from '../list-actions/action.model';
import {LibraryActionService} from '../../services/library-action.service';



@Component({
  selector: 'app-search-actions',
  templateUrl: './search-actions.component.html',
  styleUrls: ['./search-actions.component.css']
})
export class SearchActionsComponent implements OnInit {
  actionName: string;
  actions: Action[];

  constructor(private listActionsComponent: ListActionsComponent, private actionService: LibraryActionService) { }

  ngOnInit(): void {
    this.actionService.getActions().subscribe((response => {
      this.actions = response;
    }));
  }

  search(){
    if (this.actionName === ''){
      this.ngOnInit();
    }else{
      this.actions = this.actions.filter(
        res => {
          return res.actionName.toLocaleLowerCase().match(this.actionName.toLocaleLowerCase());
        }
      );
    }
  }



}
