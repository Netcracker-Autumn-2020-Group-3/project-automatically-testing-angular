import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-compound-button-menu',
  templateUrl: './compound-button-menu.component.html',
  styleUrls: ['./compound-button-menu.component.css']
})
export class CompoundButtonMenuComponent implements OnInit {
  constructor() { }


  isActive = true;


  @Output() changedPage = new EventEmitter<boolean>();

  ngOnInit(): void {}
  changePage(page: boolean){
    this.isActive = page;
    this.changedPage.emit(page);
  }
}
