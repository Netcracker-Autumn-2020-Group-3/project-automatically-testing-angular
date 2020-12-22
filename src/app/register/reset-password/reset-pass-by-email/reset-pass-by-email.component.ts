import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,
Validators,
ValidatorFn , AbstractControl,
FormControl,
FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reset-pass-by-email',
  templateUrl: './reset-pass-by-email.component.html',
  styleUrls: ['./reset-pass-by-email.component.css']
})
export class ResetPassByEmailComponent implements OnInit {

  resetByEmailForm;

  constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) {
                this.resetByEmailForm = this.formBuilder.group({
                        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
                    });
                    }

  ngOnInit(): void {
  }

  onSubmit(customerData: any): void {
      this.userService.resetPasswordByEmail(this.resetByEmailForm.value);
    }
}
