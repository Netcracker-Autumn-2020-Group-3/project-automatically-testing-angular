import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup,
Validators,
ValidatorFn , AbstractControl,
FormControl,
FormsModule} from '@angular/forms';


/*const isEqualValidator: ValidatorFn = (fg: ValidatorFn) => {
valuePass: string = fg.get('password').value;
valuePAssRepeat: string = fg.get('passwordRepeat').value;
if((valuePass && valuePAssRepeat) !== null){
const first = fg.get('password').value;
const second = fg.get('passwordRepeat').value;

return first !== null && second !== null && first === second
 ? null
 : { equal: true};
 }
};

*/


/*
function isEqualValidator (passChecked: string){
 return (control: AbstractControl):{[key: string]: any } | null => {
  const pass: string = control.value;
  const passCheck = passChecked;
  if (passCheck === null && pass !== passCheck){
      return {
      'isEqual': false
      };
  }
  return null;
};
}*/

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
  private formBuilder: FormBuilder) {
     this.resetPasswordForm = this.formBuilder.group({
        password: ['', Validators.required],
        passwordRepeat: ['', Validators.required]
     }, {validator: this.checkPasswords});

    // this.resetPasswordForm = this.formBuilder.group({
     //        password: '',
    //         passwordRepeat: ''});
   }

   checkPasswords(group: FormGroup) { // here we have the 'passwords' group
     let pass = group.get('password')!.value;
     let confirmPass = group.get('passwordRepeat')!.value;

     return pass === confirmPass ? null : { notSame: true }
   }


  ngOnInit(): void {
  this.token = 'Bearer' + this.route.snapshot.paramMap.get('token');
  }

  onSubmit(customerData: any): void {
    this.service.resetPassword(this.token, customerData.password);

  }

}
