import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProjectDto} from '../project-dto';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  project: ProjectDto;
  projectForm: any;

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
            this.project = data;
            this.projectForm = this.formBuilder.group({
              name: new FormControl(this.project.name, [
                Validators.required,
                Validators.maxLength(50),
              ]),
              link: new FormControl(this.project.link, [
                Validators.required,
                Validators.maxLength(50),
              ])
            });
          }));
        }
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    console.log('submit ' + this.project);
    if (this.projectForm.invalid) {
      this.progressMessage = 'All fields should be filled.';
      this.progressTypeClass = this.progressFail;
      this.showSaveProgress = true;
      return;
    }

    this.subscriptions.add(this.projectService.updateProject(this.project).subscribe(data => {
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
