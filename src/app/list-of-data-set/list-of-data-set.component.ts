import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-data-set',
  templateUrl: './list-of-data-set.component.html',
  styleUrls: ['./list-of-data-set.component.css']
})
export class ListOfDataSetComponent implements OnInit {

  start: number;
  end: number;

  allDataSet = [
    {id: 1, name: "test"},
    {id: 2, name: "newtest"},
    {id: 3, name: "werwer"},
    {id: 4, name: "sdfsdf"},
    {id: 5, name: "324324"},
    {id: 6, name: "qweqwe"}
  ]

  constructor() { }

  ngOnInit(): void {
    this.start = 0;
    this.end = 2;
  }
  previousPage() {
    if(this.start != 0) {
      this.start = this.start - 2;
      this.end = this.end - 2;
    }
  }
  nextPage() {
    if(this.end != this.allDataSet.length) {
      this.start = this.start + 2;
      this.end = this.end + 2;
    }
  }

}
