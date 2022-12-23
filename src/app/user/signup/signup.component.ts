import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RepositoryService } from 'src/app/services/repository.service';
import { MustMatch } from 'src/app/services/passwordMatchValidator';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() isShow: boolean;
  @Output() editedEmitter = new EventEmitter<boolean>();
  signupForm: FormGroup;
  submitted = false;

  constructor(private toastr: ToastrService, private spinner: SpinnerService, private login: LoginService, private guard: AuthGuard, private router: Router, private formBuilder: FormBuilder, private repo: RepositoryService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      name: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    },
      { validator: [MustMatch('password', 'confirmPassword')] });
  }
  get f() { return this.signupForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.spinner.show();
    this.f.name.setValue(this.f.firstName.value + ' ' + this.f.lastName.value);

    this.repo.post('company/signup', this.signupForm.value)
      .pipe(first())
      .subscribe(
        data => {
          const res: any = data;
          if (res["success"] == true) {
            this.login.login({ email: this.f.email.value, password: this.f.password.value })
              .subscribe(data => {
                this.Close();
              });
            this.spinner.hide();
            this.toastr.success(res['msg']);
          }
        },
        error => {
          this.spinner.hide();
          this.Close();
          this.toastr.success(error.error.msg);
        });

  }
  Close() {
    this.isShow = false;
    this.submitted = false;
    this.editedEmitter.emit(false);
  }
  updateValueFromLogin(val: { login, signup }) {
    this.isShow = val.signup;
  }
}
