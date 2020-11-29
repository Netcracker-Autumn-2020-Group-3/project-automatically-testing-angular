import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataSet} from '../model/dataSet';
import {DataEntry} from '../model/dataEntry';

@Injectable({
  providedIn: 'root'
})
export class EditDataSetService {

  dataEntryList = ['jo', 'go', 'mo'];

  private getDataSetForEditUrl = 'http://localhost:8080/dataset/edit/';
  private getDataEntryForEditUrl = 'http://localhost:8080/dataentry/edit/';
  private updateDataEntryUrl = 'http://localhost:8080/dataset/edit/1/';
 /* private updateDataEntryUrl = 'http://localhost:8080/dataset/edit/1/update';*/

  constructor(private http: HttpClient) { }

  getDataSetByIdForEdit(id: number){

    return this.http.get<DataSet>(this.getDataSetForEditUrl + String(id));
  }

  getDataEntryByDataSetIdForEdit(id: number){
    return this.http.get<DataEntry[]>(this.getDataEntryForEditUrl + String(id));
  }

  updateDataEntry(dataEntry: DataEntry[], dataSet: DataSet) {
    return this.http.put<string>(this.updateDataEntryUrl + dataSet.name + '/update', dataEntry);
  }

}
