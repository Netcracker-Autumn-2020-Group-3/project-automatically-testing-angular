
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { FormBuilder, FormGroup,
Validators,
ValidatorFn , AbstractControl,
FormControl,
FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reset-password-settings',
  templateUrl: './reset-password-settings.component.html',
  styleUrls: ['./reset-password-settings.component.css']
})
export class ResetPasswordSettingsComponent implements OnInit {

  resetPasswordForm;
  user: User;

  constructor(private service: UserService,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder) {
     this.resetPasswordForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}')]],
        passwordRepeat: ['', Validators.required]
     }, {validator: this.checkPasswords});

   }

   checkPasswords(group: FormGroup) {
     let pass = group.get('password')!.value;
     let confirmPass = group.get('passwordRepeat')!.value;

     return pass === confirmPass ? null : { notSame: true }
   }


  ngOnInit(): void {
  this.getUser();

  }
  getUser(): void {
    this.service.getUserSettings().then(user => this.user = user);
  }

  onSubmit(customerData:any){
    this.user.password = btoa(customerData.password);
    this.service.resetPasswordSettings(this.user);

  }

}
