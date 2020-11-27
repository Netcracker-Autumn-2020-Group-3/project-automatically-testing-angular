import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from "@angular/forms";
import { DataSet } from "../model/dataSet";
import { DataEntry } from "../model/dataEntry";
import { DataSetService } from "../services/data-set.service";

@Component({
  selector: 'app-create-data-set',
  templateUrl: './create-data-set.component.html',
  styleUrls: ['./create-data-set.component.css']
})
export class CreateDataSetComponent implements OnInit {

  dataSet: DataSet;
  dataEntry: DataEntry[];

  data_set_values: [];

  createDataSet = new FormGroup({
    Name: new FormControl(''),
    Data_set_values: new FormArray([new FormControl('')])
  });

  indexes: number[];
  counter: number;

  constructor(private services: DataSetService) {
  }

  ngOnInit(): void {
    this.indexes = [1];
    this.counter = 1;
  }

  addValue(): void {
    (<FormArray>this.createDataSet.controls["Data_set_values"]).push(new FormControl(''));
    this.indexes.push(this.counter++);
  }
  delete(i: number): void {
    this.indexes.splice(i,1);
    (<FormArray>this.createDataSet.controls["Data_set_values"]).removeAt(i);
  }
  onSubmit(customerData: any){
    this.services.addDataSet(customerData.Name, customerData.Data_set_values);
  }

}
