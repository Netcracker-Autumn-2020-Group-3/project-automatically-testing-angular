import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface Search {
  search: string;
  sort: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  currentSearch: string;
  currentSort: string;
  @Input() sorts: string[];
  @Output() changeSearch: EventEmitter<Search> = new EventEmitter<Search>();

  constructor() { }

  ngOnInit(): void {
    this.setDefaultFields();
    this.getSearchInfo();
  }

  getSearchInfo() {
    this.changeSearch.emit({search: this.currentSearch, sort: this.currentSort});
  }

  private setDefaultFields() {
    this.currentSearch = '';
    this.currentSort = this.sorts[0];
  }

}
