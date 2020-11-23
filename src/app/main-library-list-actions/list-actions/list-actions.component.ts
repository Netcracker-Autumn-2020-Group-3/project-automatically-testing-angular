import { Component, Input, OnInit } from '@angular/core';
import {Action} from './action.model';
import {LibraryActionService} from '../../services/library-action.service';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

    @Input()actions: Action[];

    p = 1;

  constructor(private actionService: LibraryActionService) { }

  ngOnInit(): void {}
}
