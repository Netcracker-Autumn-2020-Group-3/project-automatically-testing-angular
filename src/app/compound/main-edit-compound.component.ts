import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CompoundService} from '../services/compound.service';
import {Compound} from '../model/compound.model';

@Component({
  selector: 'app-main-edit-compound',
  templateUrl: './main-edit-compound.component.html',
  styleUrls: ['./main-edit-compound.component.css']
})
export class MainEditCompoundComponent implements OnInit {

  pageCompoundActions = true;
  idCompound: any;
  nameBefore: string;
  compound: Compound;
  constructor(private route: ActivatedRoute, private compoundService: CompoundService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.idCompound = value.get('id');
    });
    this.getCompound(this.idCompound);
  }

  getCompound(idCompound: any) {
    this.compoundService.getCompound(idCompound).subscribe(res => {
      this.compound = res;
      this.nameBefore = this.compound.name;
    });
  }

}
