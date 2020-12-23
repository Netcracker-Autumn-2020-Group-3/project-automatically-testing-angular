import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSet} from '../model/dataSet';
import {DataEntry} from '../model/dataEntry';
import { ActivatedRoute } from '@angular/router';
import {EditDataSetService} from '../services/edit-data-set.service';
import {EditDataEntryComponent} from './edit-data-entry/edit-data-entry.component';
import {EditNameDataSetComponent} from './edit-name-data-set/edit-name-data-set.component';
import {DataSetService} from "../services/data-set.service";
import { Location } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-data-set',
  templateUrl: './edit-data-set.component.html',
  styleUrls: ['./edit-data-set.component.css']
})
export class EditDataSetComponent implements OnInit {

  dataSet: DataSet;
  dataEntry: DataEntry[];
  idDataSet: any;

  @ViewChild(EditDataEntryComponent) editDataEntry: EditDataEntryComponent;
  @ViewChild(EditNameDataSetComponent) editDataSet: EditNameDataSetComponent;

  constructor(private dataSetService: EditDataSetService, private route: ActivatedRoute, private service: DataSetService,
              private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.idDataSet = value.get('id');
    });
    this.getDataSetById(this.idDataSet);
    this.getDataEntryById(this.idDataSet);
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

  delete() {
    this.service.delete(this.idDataSet).then(ress => {
      Swal.fire({icon: 'success',
        title: 'Ok',
        text: 'deleted successfully!'
      }).then((result) =>
        this.location.back());
    }, error => {
      Swal.fire({
        icon: "error",
        title: "error"
      })
    });
  }
}
