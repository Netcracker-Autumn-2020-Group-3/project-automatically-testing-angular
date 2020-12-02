import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-edit-compound',
  templateUrl: './main-edit-compound.component.html',
  styleUrls: ['./main-edit-compound.component.css']
})
export class MainEditCompoundComponent implements OnInit {

  page = 'compound';
  @Input('isActive')isActive = true;
  constructor() { }

  ngOnInit(): void {}


  changePage(page: string){
    this.page = page;
    this.isActive = page === 'compound';
  }

}
