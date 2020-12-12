import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Params} from '@angular/router';
import {UserDto} from '../users/users-list/user-dto';
import {Project} from '../model/project';
import {TestCaseDto} from '../model/test-case/test-case-dto';
import {ProjectDto} from '../project/project-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8080/';
  private getProjectsListUrl = this.url + 'projects/list';
  private updateProjectUrl = this.url + 'projects/update';
  private countPagesUrl = this.url + 'projects/pages/count';
  private createProjectUrl = this.url + 'projects/create';
  private archiveProjectUrl = this.url + 'projects/archive';

  constructor(private http: HttpClient) {
  }

  updateProject(project: Project) {
    return this.http.post(this.updateProjectUrl, project);
  }

  getPage(paramsVal: Params) {
    return this.http.get<Project[]>(this.getProjectsListUrl, {
      params: paramsVal
    });
  }

  countPages() {
    return this.http.get<number>(this.countPagesUrl);
  }

  postProject(project: Project) {
    return this.http.post(this.createProjectUrl, project);
  }

  getProjectDtoById(projectId: number) {
    const url = this.url + `projects/${projectId}`;
    return this.http.get<ProjectDto>(url);
  }

  archive(projectId: number) {
    return this.http.post(this.archiveProjectUrl, projectId);
  }
}
