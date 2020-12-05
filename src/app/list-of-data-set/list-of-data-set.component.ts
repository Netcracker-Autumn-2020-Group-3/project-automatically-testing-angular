import { Component, OnInit } from '@angular/core';
import { DataSet } from "../model/dataSet";
import { DataSetService } from "../services/data-set.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-list-of-data-set',
  templateUrl: './list-of-data-set.component.html',
  styleUrls: ['./list-of-data-set.component.css']
})
export class ListOfDataSetComponent implements OnInit {

  start: number;
  end: number;
  step: number = 5;
  searchedDataSet: any;

  allDataSet: DataSet[];

  constructor(private service: DataSetService) { }

  ngOnInit(): void {
    this.getAllDataSet().subscribe(dataSet => this.allDataSet = dataSet);
    this.start = 0;
    this.end = this.step;
  }
  previousPage() {
    if(this.start != 0) {
      this.start = this.start - this.step;
      this.end = this.end - this.step;
    }
  }
  nextPage() {
    if(this.end <= this.allDataSet.length - 1) {
      this.start = this.start + this.step;
      this.end = this.end + this.step;
    }
  }
  getAllDataSet(): Observable<DataSet[]> {
     return this.service.getAllDataSet();
  }
  delete(id: number) {
    const a = this.service.delete(id);
    console.log(a);
    console.log(a[Symbol.toStringTag]);

    this.getAllDataSet().subscribe(dataSet => this.allDataSet = dataSet);
    this.start = 0;
    this.end = this.step;
  }
}
