import {Component, OnInit} from '@angular/core';
import {Project} from '../../model/project';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  projectLink: string;
  projectName: string;
  project: Project = {name: '', link: '', isArchived: ''};
  projectForm;

  showSaveProgress = false;
  progressMessage = '';
  progressTypeClass = '';
  progressSuccess = 'alert-success';
  progressFail = 'alert-danger';

  constructor(
    private formBuilder: FormBuilder, private projectService: ProjectService) {
    this.projectForm = this.formBuilder.group({
      name: '',
      link: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(projectForm: any) {
    console.log('sumbit ' + projectForm.name);
    this.project.name = projectForm.name;
    this.project.link = projectForm.link;
    this.project.isArchived = 'false';
    this.projectService.postProject(this.project).subscribe(data => {
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
