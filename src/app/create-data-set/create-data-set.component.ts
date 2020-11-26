import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-create-data-set',
  templateUrl: './create-data-set.component.html',
  styleUrls: ['./create-data-set.component.css']
})
export class CreateDataSetComponent implements OnInit {

  createDataSet;
  indexes: number[];
  counter: number;
  //valuesNew: any[];
  //values: any;

  constructor(private formBuilder: FormBuilder) {
    this.createDataSet = this.formBuilder.group({
      name: '',
      values: []
    })
  }

  ngOnInit(): void {
    this.indexes = [];
    this.counter = 1;
  }

  addValue() {

    this.indexes.push(this.counter++);
  }
  delete(i: number): void {
    this.indexes.splice(i,1);
  }
  onSubmit(customerData: any){

  }

}
