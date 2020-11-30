import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataSet} from '../model/dataSet';
import {DataEntry} from '../model/dataEntry';

@Injectable({
  providedIn: 'root'
})
export class EditDataSetService {

  dataEntryList = ['jo', 'go', 'mo'];

  private url = 'https://automatically-testing-java.herokuapp.com/';
  private getDataSetForEditUrl = this.url+'dataset/edit/';
  private getDataEntryForEditUrl = this.url+'dataentry/edit/';
  private updateDataEntryUrl = this.url+'dataset/edit/4/';
  private deleteDataEntryUrl = this.url+'dataset/edit/4/';
 /* private updateDataEntryUrl = 'http://localhost:8080/dataset/edit/1/update';*/

  constructor(private http: HttpClient) { }

  deleteFromDataEntryById(dataEntryId: number){
    return this.http.delete<string>(this.deleteDataEntryUrl + dataEntryId + '/delete');
  }

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
