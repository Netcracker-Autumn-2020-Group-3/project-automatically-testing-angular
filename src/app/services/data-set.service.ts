import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataSet} from '../model/dataSet';
import {DataEntry} from "../model/dataEntry";
import {DataEntryCreate} from '../create-data-set/dataEntryCreate';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  [x: string]: any;

  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = `${environment.url}`;
  private url_get_all_data_set = this.url + 'allDataSet';
  private url_delete_data_set = this.url + 'delete-data-set/';


  constructor(private http: HttpClient) { }

  getAllDataSet(): Observable<DataSet[]> {
    return this.http.get<DataSet[]>(this.url_get_all_data_set);
  }

  addDataSet(dataSetName: string, values: DataEntryCreate[]) {
    const url = `${this.url}create-data-set`;
    const body = { dataSetName: dataSetName, dataEntryValues: values };
    return this.http.post(url, body);
  }

  delete(id: number): Promise<Object> {
    const url = `${this.url_delete_data_set}${id}`;
    return this.http.delete(url).toPromise();
  }
}
