import {Component, Input, OnInit, Output} from '@angular/core';
import {DataSet} from '../../model/dataSet';
import {DataEntry} from '../../model/dataEntry';
import {EditDataSetService} from '../../services/edit-data-set.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {EditDataSetComponent} from '../edit-data-set.component';
import {EditNameDataSetComponent} from '../edit-name-data-set/edit-name-data-set.component';

@Component({
  selector: 'app-edit-data-entry',
  templateUrl: './edit-data-entry.component.html',
  styleUrls: ['./edit-data-entry.component.css']
})
export class EditDataEntryComponent implements OnInit {

  //@Input()arrayValue = ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'];
  @Input()dataEntry: DataEntry[];
  @Input()dataSetId: number;
  deletedDataEntryItems: number[] = [];

  //smart and presentational component

  constructor(private dataSetService: EditDataSetService) {}

  ngOnInit(): void {

  }

  addValue() {
    this.dataEntry.push(new DataEntry());
  }

  deleteValue(i: number, dataEntryId: number) {
    this.dataEntry.splice(i, 1);
    this.deletedDataEntryItems.push(dataEntryId);
  }

//delete
  saveChanges(dataSet: DataSet) {
    for (const value of this.deletedDataEntryItems){
      this.dataSetService.deleteFromDataEntryById(value).subscribe();
    }
    this.dataSetService.updateDataEntry(this.dataEntry, dataSet).subscribe();
  }


  setValue(value: string, i: number) {
   this.dataEntry[i].data_set_id = this.dataSetId;
   this.dataEntry[i].value = value;
  }
}
