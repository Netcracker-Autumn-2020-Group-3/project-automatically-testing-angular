import {Component, Input, OnInit} from '@angular/core';
import {Compound} from '../../model/compound.model';

@Component({
  selector: 'app-edit-compound',
  templateUrl: './edit-compound.component.html',
  styleUrls: ['./edit-compound.component.css']
})
export class EditCompoundComponent implements OnInit {

  @Input()compound: Compound;

  constructor() { }
  p = 1;
  ngOnInit(): void {
  }

}
