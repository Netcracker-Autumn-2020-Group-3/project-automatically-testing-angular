import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  tab = 'list';

  @ViewChild('listTab') listTab: ElementRef;
  @ViewChild('addTab') addTab: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.listTab.nativeElement.classList.add('active');
  }

  onTabClick(tab: string): void {
    this.tab = tab;
    if (tab === 'list'){
      this.listTab.nativeElement.classList.add('active');
      this.addTab.nativeElement.classList.remove('active');
    } else {
      this.addTab.nativeElement.classList.add('active');
      this.listTab.nativeElement.classList.remove('active');
    }
  }


}
