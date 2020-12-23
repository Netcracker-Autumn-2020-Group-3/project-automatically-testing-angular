import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataSet} from '../model/dataSet';
import {DataEntry} from '../model/dataEntry';
import { ActivatedRoute } from '@angular/router';
import {EditDataSetService} from '../services/edit-data-set.service';
import {EditDataEntryComponent} from './edit-data-entry/edit-data-entry.component';
import {EditNameDataSetComponent} from './edit-name-data-set/edit-name-data-set.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-data-set',
  templateUrl: './edit-data-set.component.html',
  styleUrls: ['./edit-data-set.component.css']
})
export class EditDataSetComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  dataSet: DataSet;
  dataEntry: DataEntry[];
  idDataSet: any;

  @ViewChild(EditDataEntryComponent) editDataEntry: EditDataEntryComponent;
  @ViewChild(EditNameDataSetComponent) editDataSet: EditNameDataSetComponent;

  constructor(private dataSetService: EditDataSetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.idDataSet = value.get('id');
    });
    this.getDataSetById(this.idDataSet);
    this.getDataEntryById(this.idDataSet);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getDataSetById(id: number){
    this.subscriptions.add(
      this.dataSetService.getDataSetByIdForEdit(id).subscribe(
        dataSet => this.dataSet = dataSet
      )
    );
  }

  getDataEntryById(id: number){
    this.subscriptions.add(
      this.dataSetService.getDataEntryByDataSetIdForEdit(id).subscribe(
        dataEntry => this.dataEntry = dataEntry
      )
    );
  }

  saveChanges() {
    this.dataSet = this.editDataSet.save();
    this.editDataEntry.saveChanges(this.dataSet);
  }
}
