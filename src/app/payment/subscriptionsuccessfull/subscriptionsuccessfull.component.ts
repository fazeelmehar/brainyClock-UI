import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from 'src/app/services/packages.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TostarService } from 'src/app/services/tostar.service';

@Component({
  selector: 'app-subscriptionsuccessfull',
  templateUrl: './subscriptionsuccessfull.component.html',
  styleUrls: ['./subscriptionsuccessfull.component.css']
})
export class SubscriptionsuccessfullComponent implements OnInit {

  constructor(public packageService: PackageService, private router: Router, private repo: RepositoryService) { }

  ngOnInit(): void {
  }
  backToHome(){
    this.router.navigate(['/'])
  }
  gotoOrderDetail(){
    this.packageService.isTrial.next(this.packageService.isTrial.value);
    this.packageService.packageType.next(this.packageService.packageType.value);
    this.router.navigate(['/order-detail'])
  }
}
