import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { DataSet } from '../model/dataSet';
import { DataSetService } from '../services/data-set.service';
import {DataEntryCreate} from "./dataEntryCreate";
import { Location } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-data-set',
  templateUrl: './create-data-set.component.html',
  styleUrls: ['./create-data-set.component.css']
})
export class CreateDataSetComponent implements OnInit {

  dataSet: DataSet;
  dataEntryCreate: DataEntryCreate[];

  data_set_values: [];

  createDataSet = new FormGroup({
    name: new FormControl(''),
    dataSetValues: new FormArray([
      new FormGroup({
        key: new FormControl('',),
        value: new FormControl('',)
      })
    ])
  });

  indexes: number[];
  counter: number;

  constructor(private services: DataSetService, private location: Location) {
  }

  ngOnInit(): void {
    this.indexes = [1];
    this.counter = 1;
  }

  addValue(): void {
    (this.createDataSet.controls.dataSetValues as FormArray).push(new FormGroup({
      key: new FormControl(''),
      value: new FormControl('')
    }));
    this.indexes.push(this.counter++);
  }

  delete(i: number): void {
    this.indexes.splice(i, 1);
    (this.createDataSet.controls.dataSetValues as FormArray).removeAt(i);
  }

  onSubmit(customerData: any){
    this.dataEntryCreate = customerData.dataSetValues;
    console.log(customerData.name);
    console.log(this.dataEntryCreate);
    /*this.services.addDataSet(customerData.Name, this.dataEntryCreate).subscribe(ress => {
      Swal.fire({icon: 'success',
        title: 'Ok',
        text: 'created successfully!'
      }).then((result) =>
      this.location.back());
    }, error => {
      Swal.fire({
        icon: "error",
        title: "error"
      })
    });*/
  /*  this.services.addDataSet(customerData.Name, customerData.DataSetValues.filter(function (el: any) {
     return el != "";
    }));*/
  }
}
