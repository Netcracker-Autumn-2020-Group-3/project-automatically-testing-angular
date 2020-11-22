import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: any;
  user: User;
  idParam: any;
  updateUserForm;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private formBuilder: FormBuilder
  ) {
    this.updateUserForm = this.formBuilder.group({
      email: '',
      name: '',
      surname: '',
      role: '',
      enabled: ''
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.idParam = value.get("id");
    })
    this.getUserById(this.idParam);
  }

  getUserById(id: any): void {
    this.service.getUserById(id).subscribe(user => this.user = user);
  }

  onSubmit(customerData: any) {
    this.user.userId = this.idParam;
    this.user.email = customerData.email;
    this.user.name = customerData.name;
    this.user.surname = customerData.surname;
    this.user.role = customerData.role;
    if(customerData.enabled == "activate") {
      this.user.enabled = true;
    }else if(customerData.enabled == "deactivate") {
      this.user.enabled = false;
    }
    this.service.updateUser(this.user);
  }
}
