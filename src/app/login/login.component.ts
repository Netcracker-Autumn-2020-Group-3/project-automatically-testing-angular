import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  successMessage = '';
  invalidLogin = false;
  loginSuccess  = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit(): void {}

  handleLogin(): void{
    this.authenticationService.authenticationService(this.username, this.password)
      .subscribe((result: any) => {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful';
        this.router.navigate(['/admin']);
    }, () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
    });
  }

}
