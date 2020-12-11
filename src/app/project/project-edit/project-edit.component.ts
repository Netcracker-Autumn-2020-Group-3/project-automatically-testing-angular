import { Component, OnInit } from '@angular/core';
import {Project} from '../../model/project';
import {FormBuilder} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {


  projectId: number;
  project: Project = {name: '', link: '', archived: ''};
  projectForm: any;

  showSaveProgress = false;
  progressMessage = '';
  progressTypeClass = '';
  progressSuccess = 'alert-success';
  progressFail = 'alert-danger';

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder, private projectService: ProjectService) {
    this.route.paramMap.subscribe(value => {
      const projectId = value.get('project_id');
      if (projectId !== null) {
        this.projectId = parseInt(projectId, 10);
        this.projectService.getProjectDtoById(parseInt(projectId, 10)).subscribe(data => {
          this.projectForm = this.formBuilder.group({
            name: data.name,
            link: data.link,
            isArchived: data.archived
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit(projectForm: any) {
    console.log('sumbit ' + projectForm.name);
    this.project.id = this.projectId;
    this.project.name = projectForm.name;
    this.project.link = projectForm.link;
    this.project.archived = projectForm.archived;
    this.projectService.updateProject(this.project).subscribe(data => {
        this.progressMessage = 'Successfully created.';
        this.progressTypeClass = this.progressSuccess;
        this.showSaveProgress = true;
      },
      error => {
        this.progressMessage = 'Error creating project.';
        this.progressTypeClass = this.progressFail;
        this.showSaveProgress = true;
      }
    );
  }
}
