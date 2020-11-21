import { Component, OnInit } from '@angular/core';
import {ListActionsComponent} from '../list-actions/list-actions.component';
import {Actions} from '../list-actions/action.model';



@Component({
  selector: 'app-search-actions',
  templateUrl: './search-actions.component.html',
  styleUrls: ['./search-actions.component.css']
})
export class SearchActionsComponent implements OnInit {


  constructor(private listActionsComponent: ListActionsComponent) { }

  ngOnInit(): void {
  }



}
