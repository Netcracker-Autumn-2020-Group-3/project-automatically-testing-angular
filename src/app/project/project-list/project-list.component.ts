import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../model/project';
import {PaginationComponent} from '../../util/pagination/pagination.component';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  projects: Project[] = [];
  projectsObs: Observable<Project[]>;
  search = {
    name: '', link: '', onlyNotArchived: 'true', sortField: 'id', sortOrder: 'ASC', pageSize: '6', page: '1'
  };

  numberOfPages = 1;
  pageSize = 6;

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.onSearchSubmit();
  }

  countPages() {
    const params = new HttpParams()
      .append('name', this.search.name)
      .append('link', this.search.link)
      .append('onlyNotArchived', this.search.onlyNotArchived)
      .append('pageSize', this.search.pageSize);
    this.subscriptions.add(this.projectService.countPages(params).subscribe(data => {
      console.log(data);
      this.numberOfPages = data;
    }));
  }

  getParams() {
    console.log(this.search);
    let params = new HttpParams();
    Object.entries(this.search).forEach(([key, value]) => {
        params = params.append(key, value);
    });
    return params;
  }

  getPage(page: number) {
    this.search.page = page.toString(10);
    this.projectsObs = this.projectService.getPage(this.getParams());
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
    this.countPages();
    this.pagination.eventClickPage(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
