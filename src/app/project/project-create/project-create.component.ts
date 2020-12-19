import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../model/project';
import {ProjectService} from '../../services/project.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  projectLink: string;
  projectName: string;
  project: Project = {name: '', link: '', archived: 'false'};
  projectForm;

  showSaveProgress = false;
  progressMessage = '';
  progressTypeClass = '';
  progressSuccess = 'alert-success';
  progressFail = 'alert-danger';

  constructor(
    private formBuilder: FormBuilder, private projectService: ProjectService) {
    this.projectForm = this.formBuilder.group({
      name: new FormControl(this.project.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      link: new FormControl(this.project.link, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.showSaveProgress = false;
    if (this.projectForm.invalid) {
      this.progressMessage = 'All fields should be filled with value of length less than 50 symbols.';
      this.progressTypeClass = this.progressFail;
      this.showSaveProgress = true;
      return;
    }
    this.subscriptions.add(this.projectService.postProject(this.project).subscribe(data => {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
