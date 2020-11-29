import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  [x: string]: any;

  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:9003/';

  constructor(private http: HttpClient) { }

  addDataSet(dataSetName: String, values: string[]) {
    const url = `${this.url}createDataSet`;
    const urlDAtaEntry = `${this.url}createDataEntry/${dataSetName}`;
    const body = {id: null, name: dataSetName};
    this.http.put(url, body).toPromise();
    for(var i=0; i<values.length; i++){
      const b = {id: null, data_set_id: null, value: values[i]};
      this.http.put(urlDAtaEntry, b).toPromise();
    }
  }
}
