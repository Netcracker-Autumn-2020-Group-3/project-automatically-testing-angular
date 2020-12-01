import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSet} from '../model/dataSet';
import {DataEntry} from '../model/dataEntry';
import {EditDataSetService} from '../services/edit-data-set.service';
import {EditDataEntryComponent} from './edit-data-entry/edit-data-entry.component';
import {EditNameDataSetComponent} from './edit-name-data-set/edit-name-data-set.component';

@Component({
  selector: 'app-edit-data-set',
  templateUrl: './edit-data-set.component.html',
  styleUrls: ['./edit-data-set.component.css']
})
export class EditDataSetComponent implements OnInit {

  dataSet: DataSet;
  dataEntry: DataEntry[];

  @ViewChild(EditDataEntryComponent) editDataEntry: EditDataEntryComponent;
  @ViewChild(EditNameDataSetComponent) editDataSet: EditNameDataSetComponent;


  constructor(private dataSetService: EditDataSetService) { }

  //TODO route from list of all dataSet
  ngOnInit(): void {
    this.getDataSetById(4);
    this.getDataEntryById(4);
  }

  getDataSetById(id: number){
    this.dataSetService.getDataSetByIdForEdit(id).subscribe(
      dataSet => this.dataSet = dataSet
    );
  }

  getDataEntryById(id: number){
    this.dataSetService.getDataEntryByDataSetIdForEdit(id).subscribe(
      dataEntry => this.dataEntry = dataEntry
    );
  }

  saveChanges() {
    this.dataSet = this.editDataSet.save();
    this.editDataEntry.saveChanges(this.dataSet);
  }
}
