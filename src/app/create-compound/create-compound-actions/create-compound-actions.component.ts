import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Action} from '../../model/action.model';
import {HttpParams} from '@angular/common/http';
import {LibraryActionService} from '../../services/library-action.service';
import Swal from 'sweetalert2';
import {CompoundAction} from '../../model/compoundAction';


@Component({
  selector: 'app-create-compound-actions',
  templateUrl: './create-compound-actions.component.html',
  styleUrls: ['./create-compound-actions.component.css']
})
export class CreateCompoundActionsComponent implements OnInit {


  @Input()addedActionForCompound: Array <{priority: number, action: Action}> = [];

  priority = 1;

  compoundActionsArray: CompoundAction[] = [];



  addedActionsPagination: number;
  paginationStart: number;
  paginationEnd: number;
  paginationPageNumber = 1;


  //actionName: string;
  actions: Action[];
  pageNumber: number;
  numberOfPages: number;
  pageSize = 2;
  orderSearch = '';
  createCompound = true;
  actionForCompound: Action;
  createCompoundSearchActions = true;

  @Output()chosenAction = new EventEmitter<Array<{ priority: number; action: Action }>>();



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
    this.addedActionForCompound.push({priority: 1, action: this.actionForCompound});
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
      text: 'Check your priority!'});
  }




  getOrderSearch() {

  }

  getActionsFromSearch(ev: Action[]) {
    this.actions = ev;
  }

  saveCompoundActions(addedActionForCompound: Array<{ priority: number; action: Action }>) {
    let flag = 0;
    for (let i = 0; i < addedActionForCompound.length - 1; i++) {
      for (let j = i + 1; j < addedActionForCompound.length; j++) {
        if (addedActionForCompound[i].priority === addedActionForCompound[j].priority){
          flag++;
          this.alert();
        }
      }
    }

    if (flag === 0){
      this.chosenAction.emit(addedActionForCompound);
      //this.makeCompoundAction(addedActionForCompound);
    }

  }

  makeCompoundAction(addedActionForCompound: Array<{ priority: number; action: Action }>){
    /*for(const val of addedActionForCompound){
      this.compoundActionsArray.push(new CompoundAction())
    }*/
  }

}


