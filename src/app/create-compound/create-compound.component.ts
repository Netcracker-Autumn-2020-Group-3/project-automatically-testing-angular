import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-compound',
  templateUrl: './create-compound.component.html',
  styleUrls: ['./create-compound.component.css']
})
export class CreateCompoundComponent implements OnInit {

  compoundActions = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChangedPage(a: any){
    this.compoundActions = a;
  }

}
