import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm;

  constructor(
   private route: ActivatedRoute,
   private formBuilder: FormBuilder,
   private service: UserService

 ) {
  this.registerForm = this.formBuilder.group({
        email: '',
        password: '',
        name: '',
        surname: '',
        role: ''

    });
  }

  ngOnInit(): void {

  }

  onSubmit(customerData: any) {
      this.user.email = customerData.email;
      this.user.name = customerData.name;
      this.user.surname = customerData.surname;
      this.user.password = customerData.password;
      this.user.role = customerData.role;
      console.log("OK");
        this.service.addUser(this.user);

  }
}
