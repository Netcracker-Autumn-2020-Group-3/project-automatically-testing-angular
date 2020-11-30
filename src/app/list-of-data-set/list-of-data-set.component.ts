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

  allDataSetTest = [
    {id: 1, name: "test"},
    {id: 2, name: "newtest"},
    {id: 3, name: "werwer"},
    {id: 4, name: "sdfsdf"},
    {id: 5, name: "324324"},
    {id: 6, name: "qweqwe"},
    {id: 1, name: "teset"},
    {id: 2, name: "qwqqst"},
    {id: 3, name: "aasser"},
    {id: 4, name: "zxxxdf"},
    {id: 5, name: "7824"},
    {id: 6, name: "yuyueqwe"},
    {id: 1, name: "filt"}
  ]

  constructor(private service: DataSetService) { }

  ngOnInit(): void {
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
    if(this.end <= this.allDataSetTest.length) {
      this.start = this.start + this.step;
      this.end = this.end + this.step;
    }
  }
  getAllDataSet() {
     this.service.getAllDataSet();
  }
}
