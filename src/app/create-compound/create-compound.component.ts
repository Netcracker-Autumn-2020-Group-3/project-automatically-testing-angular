import { Component, OnInit } from '@angular/core';
import {Compound} from '../model/compound.model';
import {CompoundAction} from '../model/compoundAction';
import {Action} from '../model/action.model';
import {CompoundService} from '../services/compound.service';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CompoundDto} from '../model/compound-dto';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-compound',
  templateUrl: './create-compound.component.html',
  styleUrls: ['./create-compound.component.css']
})
export class CreateCompoundComponent implements OnInit {

  pageCompoundActions = true;

  actions: Action[];
  compound = new Compound(1, '', '');
  compoundActions: CompoundAction[] = [];
  arrayForPassing: CompoundDto;
  name: string;
  description: string;
  nameExist: boolean;

  constructor(private compoundService: CompoundService , private router: Router) { }

  ngOnInit(): void {}

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  createCompound(actions: Action[]) {
    this.actions = actions;
  }

  saveCompound() {
      this.fillTheCompound();
      this.checkIfCompoundExist();
  }

  fillTheCompound(){
    this.compound.name = this.name;
    this.compound.description = this.description;
  }

  fillTheCompoundActionPriority(){
    this.actions.forEach((value, index) => {
      this.compoundActions.push(new CompoundAction(value.actionId, index + 1));
    });
  }

  checkIfCompoundExist() {
    this.compoundService.checkIfCompoundNameExist(this.compound.name).subscribe(res =>{
      if (res){
        Swal.fire({icon: 'error',
          title: 'Oops...',
          text: 'Check your name!'});
      }else{
        this.fillTheCompoundActionPriority();
        this.insertCompAndActions();
      }
    });
  }

  insertCompAndActions() {
    this.arrayForPassing = new CompoundDto(this.compound.name, this.compound.description, this.compoundActions);
    this.compoundService.createCompound(this.arrayForPassing).subscribe(res => {
      Swal.fire({icon: 'success',
        title: 'ok',
        text: 'Compound was created successfully!'});
      this.router.navigate(['/library/actions']);
    });
  }
}
