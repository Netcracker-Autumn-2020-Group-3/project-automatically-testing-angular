import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Compound} from '../../model/compound.model';
import {CompoundService} from '../../services/compound.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-compound-name',
  templateUrl: './create-compound-name.component.html',
  styleUrls: ['./create-compound-name.component.css']
})
export class CreateCompoundNameComponent implements OnInit {

  @Input()compoundName: string;
  @Input()compoundDescription: string;
  nameExist = false;

  @Output()name = new EventEmitter<string>();
  @Output()description = new EventEmitter<string>();
  com: Compound;

  constructor(private compoundService: CompoundService) { }

  ngOnInit(): void {
  }

  setCompoundName(name: any) {

  }
  setCompoundDesc(desc: any) {

  }

  saveCompound(): void{
    this.compoundService.checkIfCompoundNameExist(this.compoundName).subscribe(res => {
      this.nameExist = res;
      if (this.nameExist){
        Swal.fire({icon: 'error',
          title: 'Oops...',
          text: 'Check your name!'});
      }else{
        this.name.emit(this.compoundName);
        this.description.emit(this.compoundDescription);
      }
    });
  }
}
