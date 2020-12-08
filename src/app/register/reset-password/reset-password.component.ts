import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn , AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';


const isEqualValidator: ValidatorFn = (fg: AbstractControl) => {
const first = fg.get('password').value;
const second = fg.get('passwordRepeat').value;
return first !== null && second !== null && first === second
 ? null
 : { equal: true};
};




@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;

  resetPasswordForm;

  constructor(private service: UserService,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private router: Router) {
     this.resetPasswordForm = this.formBuilder.group({
        password: [null, Validators.required],
        passwordRepeat: [null, Validators.required]
     },{ validator: isEqualValidator});
   }



  ngOnInit(): void {
  this.token = 'Bearer' + this.route.snapshot.paramMap.get('token');
  }

  onSubmit(customerData: any): void {
    this.service.resetPassword(this.token, customerData.password);

  }

}
