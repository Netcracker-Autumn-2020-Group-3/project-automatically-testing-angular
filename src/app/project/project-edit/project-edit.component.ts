import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProjectDto} from '../project-dto';
import {Project} from '../../model/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  project: Project = {name: '', link: '', id: -1, archived: ''};
  projectInitialized = false;

  showSaveProgress = false;
  progressMessage = '';
  progressTypeClass = '';
  progressSuccess = 'alert-success';
  progressFail = 'alert-danger';

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder, private projectService: ProjectService) {
    this.subscriptions.add(
      this.route.paramMap.subscribe(value => {
        const projectId = value.get('project_id');
        if (projectId !== null) {
          this.subscriptions.add(this.projectService.getProjectDtoById(parseInt(projectId, 10)).subscribe(data => {
            console.log(data);
            this.project.name = data.name;
            this.project.link = data.link;
            this.project.id = data.id;
            this.project.archived = data.archived.toString();
            this.projectInitialized = true;
          }));
        }
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(project: Project) {
    console.log('submit ' + project.name);
    console.log('submit ' + project.link);
    console.log('submit ' + project.id);

    this.subscriptions.add(this.projectService.updateProject(project).subscribe(data => {
        this.progressMessage = 'Successfully created.';
        this.progressTypeClass = this.progressSuccess;
        this.showSaveProgress = true;
      },
      error => {
        this.progressMessage = 'Error creating project.';
        this.progressTypeClass = this.progressFail;
        this.showSaveProgress = true;
      }
    ));
  }
}
