import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../model/project';
import {PaginationComponent} from '../../util/pagination/pagination.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  search = {
    name: '', link: '', onlyNotArchived: 'true', sortField: 'id', sortOrder: 'ASC', pageSize: '3', page: '1'};

  numberOfPages = 1;
  pageSize = 3;

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.countPages().subscribe(data => {
      this.numberOfPages = data;
      console.log(this.numberOfPages);
    });
    this.onSearchSubmit();
  }

  getParams() {
    console.log(this.search);
    let params = new HttpParams();
    Object.entries(this.search).forEach(([key, value]) => {
      if (value != null && value !== '') {
        params = params.append(key, value);
      }
    });
    return params;
  }

  getPage(page: number) {
    this.search.page = page.toString(10);
    this.projectService.getPage(this.getParams()).subscribe(data => {
      this.projects = data;
    }, error => {
      console.log(error);
    });
  }

  onColumnNameClick(column: string) {
    if (this.search.sortField !== column) {
      this.search.sortField = column;
      this.search.sortOrder = 'ASC';
    } else {
      this.search.sortOrder = (this.search.sortOrder === 'ASC' ? 'DESC' : 'ASC');
    }

    this.search.page = '1';
    this.pagination.eventClickPage(1);
  }


  onSearchSubmit() {
    this.search.page = '1';
    this.pagination.eventClickPage(1);
  }

}
