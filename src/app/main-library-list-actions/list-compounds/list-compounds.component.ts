import { Component, OnInit } from '@angular/core';
import {LibraryCompoundService} from '../../services/library-compound.service';
import {Compound} from '../../model/compound.model';

@Component({
  selector: 'app-list-compounds',
  templateUrl: './list-compounds.component.html',
  styleUrls: ['./list-compounds.component.css']
})
export class ListCompoundsComponent implements OnInit {

  compounds: Compound[];
  constructor(private service: LibraryCompoundService) { }

  ngOnInit(): void {
    this.getCompounds();
  }

  getCompounds(): void {
    this.service.getCompounds()
      .subscribe(compounds => this.compounds = compounds);
  }

}
