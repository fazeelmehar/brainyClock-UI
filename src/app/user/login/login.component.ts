import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from "../../services/repository.service";
import { first } from 'rxjs/operators';
import { AuthenticatedResponse } from "../../model/AuthenticationModel.model";
import { User } from 'src/app/model/user.model';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() isShow: boolean;
  @Output() editedEmitter = new EventEmitter<{}>();
  isShowForgotPassword = false;
  loginForm: FormGroup;
  submitted = false;


  constructor(private guard: AuthGuard, private router: Router, private formBuilder: FormBuilder, private repo: RepositoryService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.repo.post('company/login', this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          const res: any = data;
          localStorage.setItem("jwt", res.data.access_token);
          localStorage.setItem("user", JSON.stringify(res.data));
          debugger
          this.guard.isUserAuthenticated().next(true);
          this.guard.UserInfo().next(<User>JSON.parse(JSON.stringify(res.data)));
          this.Close();
        },
        error => {
          window.alert(error.error.returnMessage[0]);
          // this.toastr.error(error.error.returnMessage[0], 'Error');
        });

  }

  Close() {
    this.isShow = false;
    this.editedEmitter.emit({ login: this.isShow });
  }
  showSignup(val: boolean) {
    this.editedEmitter.emit({ login: false, signup: val });
  }
  showForgotPassword(val: boolean) {
    this.isShowForgotPassword = val;
  }
  updateValueFromForgotPassword(val: { forgotPassword, login }) {

    this.isShowForgotPassword = val.forgotPassword;
    this.isShow = val.login;
    if (val.login != undefined)
      this.editedEmitter.emit({ login: val.login });
  }
}
