import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';
import {Project} from '../model/project';
import {ProjectDto} from '../project/project-dto';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = `${environment.url}projects/`;

  constructor(private http: HttpClient) {
  }

  getPage(paramsVal: Params) {
    return this.http.get<Project[]>(`${this.url}list`, {
      params: paramsVal
    });
  }

  countPages() {
    return this.http.get<number>(`${this.url}pages/count`);
  }

  postProject(project: Project) {
    return this.http.post(this.url, project);
  }

  updateProject(project: ProjectDto) {
    return this.http.put(`${this.url}${project.id}`, project);
  }

  getProjectDtoById(projectId: number) {
    return this.http.get<ProjectDto>(`${this.url}${projectId}`);
  }

  archive(projectId: number) {
    return this.http.patch(`${this.url}${projectId}/archive`, {});
  }

  unarchive(projectId: number) {
    return this.http.patch(`${this.url}${projectId}/unarchive`, {});
  }
}
