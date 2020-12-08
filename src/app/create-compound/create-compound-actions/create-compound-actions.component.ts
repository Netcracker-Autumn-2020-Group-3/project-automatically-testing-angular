import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Action} from '../../model/action.model';
import {LibraryActionService} from '../../services/library-action.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-compound-actions',
  templateUrl: './create-compound-actions.component.html',
  styleUrls: ['./create-compound-actions.component.css']
})
export class CreateCompoundActionsComponent implements OnInit {

  actions: Action[];
  actionsInCompound: Action[] = [];
  @Output()actionsInCompound1 = new EventEmitter<Action[]>();
  searchedAction: any;

  constructor(private actionService: LibraryActionService) { }

  ngOnInit(): void {
    this.actionService.getAllActions().subscribe(( res => {
      this.actions = res;
    }));
  }

  drop(event: CdkDragDrop<Action[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.actionsInCompound1.emit(this.actionsInCompound);
  }
}


