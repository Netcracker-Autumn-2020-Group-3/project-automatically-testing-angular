import {Component, OnInit} from '@angular/core';
import {ProjectDto} from '../project-dto';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  project: ProjectDto;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      const projectId = value.get('project_id');
      if (projectId !== null) {
        this.projectService.getProjectDtoById(parseInt(projectId, 10)).subscribe(data => {
          this.project = data;
          console.log(this.project);
        });
      }
    });
  }

  archive(): void {
    this.projectService.archive(this.project.id).subscribe(data =>{
      console.log('archived');
    });
  }
  onArchiveButton(){
    if(this.project.archived){
      this.projectService.unarchive(this.project.id).subscribe(data =>{
        console.log('unarchived');
      });
      this.project.archived = false;
    } else {
      this.projectService.archive(this.project.id).subscribe(data =>{
        console.log('archived');
      });
      this.project.archived = true;
    }
  }

}
