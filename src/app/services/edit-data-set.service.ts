import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataSet} from '../model/dataSet';
import {DataEntry} from '../model/dataEntry';

@Injectable({
  providedIn: 'root'
})
export class EditDataSetService {

  private getDataSetForEditUrl = 'http://localhost:8080/dataset/edit/';
  private getDataEntryForEditUrl = 'http://localhost:8080/dataentry/edit/';
  private updateDataEntryUrl = 'http://localhost:8080/dataset/edit/4/';
  private deleteDataEntryUrl = 'http://localhost:8080/dataset/edit/4/';
 /* private updateDataEntryUrl = 'http://localhost:8080/dataset/edit/1/update';*/

  constructor(private http: HttpClient) { }

  //delete url delete
  deleteFromDataEntryById(dataEntryId: number){
    return this.http.delete<string>(this.deleteDataEntryUrl + dataEntryId + '/delete');
  }

  getDataSetByIdForEdit(id: number){
    return this.http.get<DataSet>(this.getDataSetForEditUrl + String(id));
  }

  getDataEntryByDataSetIdForEdit(id: number){
    return this.http.get<DataEntry[]>(this.getDataEntryForEditUrl + String(id));
  }

  //todo give name
  updateDataEntry(dataEntry: DataEntry[], dataSet: DataSet) {
    return this.http.put<string>(this.updateDataEntryUrl + dataSet.name + '/update', dataEntry);
  }

}
