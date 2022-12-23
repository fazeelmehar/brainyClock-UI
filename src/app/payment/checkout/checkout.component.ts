import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public packageService: PackageService, private router: Router) { }

  ngOnInit(): void {


  }
  backToHome() {
    this.router.navigate(['/'])
  }
  proceedToPay() {
    if (this.packageService.isTrial.value == undefined)
      return false;
    this.packageService.isTrial.next(this.packageService.isTrial.value);
    this.packageService.packageType.next(this.packageService.packageType.value);
    this.router.navigate(['/payment-option']);
  }

}
