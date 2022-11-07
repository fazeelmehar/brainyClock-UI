import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user.model';
import { BehaviorSubject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

  isUserAuthenticated = (): BehaviorSubject<boolean> => {

    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {

      return new BehaviorSubject<boolean>(true);
    }
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    return new BehaviorSubject<boolean>(false);
  }

  UserInfo = (): any => {

    if (localStorage.getItem("user") != null)
      return new BehaviorSubject<User>(<User>JSON.parse(localStorage.getItem("user")));
  };
}
