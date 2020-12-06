import {Component, Input, OnInit} from '@angular/core';
import {Compound} from '../../model/compound.model';
import Swal from 'sweetalert2';
import {CompoundService} from '../../services/compound.service';
import {CompoundAction} from '../../model/compoundAction';

@Component({
  selector: 'app-edit-compound',
  templateUrl: './edit-compound.component.html',
  styleUrls: ['./edit-compound.component.css']
})
export class EditCompoundComponent implements OnInit {

  @Input()compound: Compound;
  nameExist: boolean;
  @Input()nameBefore: string;

  constructor(private compoundService: CompoundService) {
  }

  ngOnInit(): void {
  }

  updateCompound() {
    this.compoundService.checkIfCompoundNameExist(this.compound.name).subscribe(res => {
      this.nameExist = res;
      if (this.nameExist && this.nameBefore !== this.compound.name){
        Swal.fire({icon: 'error',
          title: 'Oops...',
          text: 'Check your name!'});
      }else{
        this.compoundService.updateCompound(this.compound).subscribe();
      }
    });
  }





}
