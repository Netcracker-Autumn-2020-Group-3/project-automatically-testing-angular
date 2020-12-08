import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
        password: ''
     });
   }



  ngOnInit(): void {
  this.token = 'Bearer' + this.route.snapshot.paramMap.get('token');
  }

  onSubmit(customerData: any): void {
    this.service.resetPassword(this.token, customerData.password);

  }

}
