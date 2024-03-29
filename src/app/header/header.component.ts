import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../model/user.model';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile = false;
  isShowLogin = false;
  isShowSignup = false;
  isLoggedIn: Observable<boolean>;
  screenWidth: number;
  user: Observable<User>;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if (window.innerWidth < 500)
      this.isMobile = true;
    else
      this.isMobile = false;
  }

  constructor(private guard: AuthGuard, private router: Router) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.user = this.guard.UserInfo();
    this.isLoggedIn = this.guard.isUserAuthenticated();
    this.isLoggedIn = this.guard.isUserAuthenticate;
    this.guard.isUserAuthenticate.subscribe(data => {
      this.user = this.guard.UserInfo();
    })
  }

  ShowLogin() {
    this.isShowLogin = true;
  }
  ShowSignup() {
    this.isShowSignup = true;

  }
  updateValueFromLogin(val: { login, signup }) {
    this.isShowSignup = val.signup;
    if (val.signup != undefined)
      setTimeout(() => {
        this.isShowLogin = val.login;
      }, 400);
    else
      this.isShowLogin = val.login;
  }
  updateValueSignup(val: boolean) {
    this.isShowSignup = val;
  }


}
