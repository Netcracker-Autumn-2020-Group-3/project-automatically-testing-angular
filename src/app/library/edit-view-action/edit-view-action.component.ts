import {Component, Input, OnInit} from '@angular/core';
import {Compound} from '../../model/compound.model';
import {CompoundService} from '../../services/compound.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Action} from '../../model/action.model';
import {LibraryActionService} from '../../services/library-action.service';
import {ActionVariableDto} from '../../model/action-variable-dto.model';
import {Variable} from '../../model/variable';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-view-action',
  templateUrl: './edit-view-action.component.html',
  styleUrls: ['./edit-view-action.component.css']
})
export class EditViewActionComponent implements OnInit {

  nameExist: boolean;

  pageCompoundActions = true;
  idAction: any;
  nameBefore: string;
  action: Action = new Action(0, '', '');
  variables: Variable[] = [];
  actionVariableArray: ActionVariableDto[];
  actionVariable: ActionVariableDto;
  constructor(private route: ActivatedRoute, private libraryActionService: LibraryActionService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.idAction = value.get('id');
    });
    this.libraryActionService.getActionById(this.idAction).subscribe(res => {
      this.actionVariableArray = res;
      this.getActionVariable();
    });
  }

  getActionVariable() {
    this.actionVariableArray.forEach(value => {
      this.action.actionId = value.actionId;
      this.action.actionName = value.actionName;
      this.action.actionDescription = value.actionDescription;
      this.variables.push(new Variable(value.variableName));
    });
  }


  updateActionDescription() {
    this.libraryActionService.updateActionDescription(this.action).subscribe(res => {
      Swal.fire({icon: 'success',
        title: 'ok',
        text: 'Action was updated successfully!'});
      this.router.navigate(['/library/actions']);
    });
  }

}
