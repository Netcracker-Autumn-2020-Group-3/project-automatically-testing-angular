import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../model/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  search = {
    name: '', link: '', userId: '', sortField: 'id', sortOrder: 'ASC', pageSize: '3'
  };

  page = 1;
  numberOfPages = 1;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.countPages().subscribe(data => {
      this.numberOfPages = data;
    });
    this.onSearchSubmit();
  }

  getParams() {
    let params = new HttpParams().append('page', this.page.toString(10));
    Object.entries(this.search).forEach(([key, value]) => {
      if (value != null && value !== '') {
        params = params.append(key, value);
      }
    });
    return params;
  }

  onSearchSubmit() {
    this.page = 1;
    this.projectService.getPage(this.getParams()).subscribe(data => {
      this.projects = data.map(project => {
        console.log(project);
        project.isArchived = project.isArchived ? 'yes' : 'no';
        return project;
      });
    }, error => {
      console.log(error);
    });
  }

  onNextPage() {
    if (this.page !== this.numberOfPages) {
      this.page += 1;
      this.projectService.getPage(this.getParams()).subscribe(data => {
        this.projects = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onPreviousPage() {
    if (this.page !== 1) {
      this.page -= 1;
      this.projectService.getPage(this.getParams()).subscribe(data => {
        this.projects = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onFirstPage() {
    this.page = 1;
    this.projectService.getPage(this.getParams()).subscribe(data => {
      this.projects = data;
    }, error => {
      console.log(error);
    });
  }

  onLastPage() {
    this.page = this.numberOfPages;
    this.projectService.getPage(this.getParams()).subscribe(data => {
      this.projects = data;
    }, error => {
      console.log(error);
    });
  }

}
