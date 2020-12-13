import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Params} from '@angular/router';
import {UserDto} from '../users/users-list/user-dto';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8081/';
  private getProjectsListUrl = this.url + 'projects/list';
  private updateProjectUrl = this.url + 'projects/update';
  private countPagesUrl = this.url + 'projects/pages/count';
  private createProjectUrl = this.url + 'projects/create';

  constructor(private http: HttpClient) {
  }

  getProjectById(id: number) {
    const url = `${this.url}projects/${id}`;
    return this.http.get<Project>(url);
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
}
