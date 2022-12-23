import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { first } from 'rxjs/operators';
import { AuthGuard } from '../auth/auth.guard';
import { PackageType } from '../enum/packagetype.enum';
import { PackageService } from '../services/packages.service';
import { RepositoryService } from '../services/repository.service';
import { SpinnerService } from '../services/spinner.service';
import { TostarService } from '../services/tostar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  packageType = PackageType;

  constructor(private spinner: SpinnerService, private repo: RepositoryService, private guard: AuthGuard, private tostar: TostarService, public packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.packageService.get(this.packageType.Base).users;
  }
  checkout(type: PackageType, isTrial: boolean) {
    if (!this.guard.isSignedIn())
      this.tostar.pleaseloginbeforebuy();

    // if (isTrial && this.checkIsUserAvailableForTrial())
    //   return;

    this.packageService.packageType.next(type);
    this.packageService.isTrial.next(isTrial);
    this.router.navigate(['/checkout'])
  }


  checkIsUserAvailableForTrial(): boolean {
    this.spinner.show();
    this.repo.getData('subscription/eligibility', this.guard.GetUserId())
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          if (data["success"] != true) {
            this.tostar.custom(data['msg']);
            return false;
          }
        },
        error => {
          this.spinner.hide();
          this.tostar.custom(error.error.msg);
          return false;
        });
    return true;
  }
}
