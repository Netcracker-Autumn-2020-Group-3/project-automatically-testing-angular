import { Component, Input, OnInit } from '@angular/core';
import {Actions} from './action.model';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

    actions: Actions[] = [new Actions(1, 'text', 'desc'),
    new Actions(2, 'text', 'desc'),
    new Actions(3, 'wext', 'desc'),
    new Actions(4, 'sext', 'desc'),
    new Actions(5, 'text', 'desc'),
    new Actions(6, 'text', 'desc'),
    new Actions(7, 'text', 'desc'),
    new Actions(8, 'text', 'desc'),
    new Actions(9, 'text', 'desc'),
    new Actions(11, 'text', 'desc'),
    new Actions(12, 'text', 'desc'),
    new Actions(13, 'text', 'desc'),
    new Actions(14, 'text', 'desc')];

    p = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
