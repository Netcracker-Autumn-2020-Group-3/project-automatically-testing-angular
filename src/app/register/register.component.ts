import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { FormBuilder, FormGroup,
Validators,
ValidatorFn , AbstractControl,
FormControl,
FormsModule} from '@angular/forms';
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
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}')]],
        name: ['',[ Validators.required, Validators.maxLength(40)]],
        surname: ['', [Validators.required, Validators.maxLength(40)]],
        role: ['', Validators.required]

    });
  }

  ngOnInit(): void {

  }

  onSubmit(customerData: any) {
        this.service.addUser(this.registerForm.value);

  }
}
