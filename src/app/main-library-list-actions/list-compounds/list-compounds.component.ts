import { Component, OnInit } from '@angular/core';
import {LibraryCompoundService} from '../../services/library-compound.service';
import {Compound} from '../../model/compound.model';
import {Search} from '../../util/search/search.component';

@Component({
  selector: 'app-list-compounds',
  templateUrl: './list-compounds.component.html',
  styleUrls: ['./list-compounds.component.css']
})
export class ListCompoundsComponent implements OnInit {

  name = '';
  compounds: Compound[];
  quantityPages: number;
  sorts = ['id', 'name'];
  currentPage: number;
  currentPageSize = 5;
  currentSearch: string;
  currentSort: string;
  constructor(private service: LibraryCompoundService) { }

  ngOnInit(): void {
    this.getQuantityPages();
  }

  getSearch(search: Search) {
    this.currentSearch = search.search;
    this.currentSort = search.sort;
    this.getCompounds();
  }

  getPage(page: number) {
    this.currentPage = page;
    this.getCompounds();
  }

  private getCompounds(): void {
    this.service.getCompounds(this.currentPage, this.currentPageSize, this.currentSearch, this.currentSort)
      .subscribe(compounds => this.compounds = compounds);
  }

  private getQuantityPages() {
    this.service.getQuantityCompounds()
      .subscribe(quantity => {
        this.quantityPages = Math.ceil(quantity / this.currentPageSize);
      });
  }

}
