import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {DataSet} from "../model/dataSet";
import {DataEntry} from "../model/dataEntry";
import {DataEntryCreate} from "../create-data-set/dataEntryCreate";


@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  [x: string]: any;

  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:9003/';
  private url_get_all_data_set = this.url+"allDataSet";


  constructor(private http: HttpClient) { }

  getAllDataSet(): Observable<DataSet[]> {
    return this.http.get<DataSet[]>(this.url_get_all_data_set);
  }

  addDataSet(dataSetName: String, values: DataEntryCreate[]) {
    const url = `${this.url}create-data-set/${dataSetName}`;
    this.http.post(url, values).toPromise();
  }
}
