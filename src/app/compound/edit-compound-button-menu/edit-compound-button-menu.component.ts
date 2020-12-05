import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-compound-button-menu',
  templateUrl: './edit-compound-button-menu.component.html',
  styleUrls: ['./edit-compound-button-menu.component.css']
})
export class EditCompoundButtonMenuComponent implements OnInit {

  constructor() { }


  isActive = true;


  @Output() changedPage = new EventEmitter<boolean>();

  ngOnInit(): void {}
  changePage(page: boolean){
    this.isActive = page;
    this.changedPage.emit(page);
  }

}
