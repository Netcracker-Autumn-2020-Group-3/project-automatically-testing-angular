import { Component, OnInit } from '@angular/core';
import {Compound} from '../model/compound.model';
import {CompoundAction} from '../model/compoundAction';
import {Action} from '../model/action.model';
import {CompoundService} from '../services/compound.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-compound',
  templateUrl: './create-compound.component.html',
  styleUrls: ['./create-compound.component.css']
})
export class CreateCompoundComponent implements OnInit {

  pageCompoundActions = true;
  compound = new Compound(0, '', '');
  name = '';
  description = '';

  compoundActions: Array <{priority: number, action: Action}> = [];
  compoundActionPriority: CompoundAction[] = [];

  constructor(private compoundService: CompoundService) { }

  ngOnInit(): void {


  }

  onChangedPage(page: any){
    this.pageCompoundActions = page;
  }


  setName(name: string) {
    this.name = name;
    this.compound.name = this.name;
  }

  setDescription(desc: string) {
    this.description = desc;
    this.compound.description = this.description;
  }

  save(actions: Array<{ priority: number; action: Action }>) {
    this.compoundActions = actions;
  }
  createCompound() {
   this.compoundService.createCompound(this.compound).subscribe(res => {
     this.compound.id = res;
     for (const val of this.compoundActions){
       this.compoundActionPriority.push(new CompoundAction(this.compound.id, val.action.actionId, val.priority));
       console.log(this.compoundActionPriority.length);
     }
     this.compoundService.createCompoundActions(this.compoundActionPriority).subscribe(ress => {
       if (ress === 'OK'){
         Swal.fire({icon: 'success',
           title: 'Ok',
           text: 'updated successfully!'});
       }
     });
   });
  }
}
