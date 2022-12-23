import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from 'src/app/services/packages.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TostarService } from 'src/app/services/tostar.service';

@Component({
  selector: 'app-paymentoption',
  templateUrl: './paymentoption.component.html',
  styleUrls: ['./paymentoption.component.css']
})
export class PaymentoptionComponent implements OnInit {

  paymentForm: FormGroup;
  submitted = false;
  constructor(private tostar: TostarService, public packageService: PackageService, private router: Router, private spinner: SpinnerService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private repo: RepositoryService) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      nameOnCard: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
  }
  get f() { return this.paymentForm.controls; }

  cancelTransaction() {
    this.setPackage();
    this.router.navigate(['/checkout']);
  }
  makePayment() {
    this.submitted = true;
    if (this.paymentForm.invalid) {

      this.validation();
      return;
    }

    if (this.packageService.isTrial.value == undefined) {
      this.tostar.somethingWentWrong();
      return false;
    }

    this.setPackage();
    this.router.navigate(['/subscription-successfull']);

  }
  validation() {
    if (this.paymentForm.controls.nameOnCard.errors?.required) {
      this.tostar.custom('Name on card is required');
    }
    else if (this.paymentForm.controls.cardNumber.errors?.required) {
      this.tostar.custom('Card Number is required');
    }
    else if (this.paymentForm.controls.expiry.errors?.required) {
      this.tostar.custom('Card Expiry is required');
    }
    else if (this.paymentForm.controls.cvv.errors?.required) {
      this.tostar.custom('CVV is required');
    }
    else if (this.paymentForm.controls.streetAddress.errors?.required) {
      this.tostar.custom('Billing Address is required');
    }
    else if (this.paymentForm.controls.state.errors?.required) {
      this.tostar.custom('State/Province Number is required');
    }
    else if (this.paymentForm.controls.city.errors?.required) {
      this.tostar.custom('City is required');
    }
    else if (this.paymentForm.controls.zipCode.errors?.required) {
      this.tostar.custom('Zip Code is required');
    }
  }
  private setPackage() {
    this.packageService.isTrial.next(this.packageService.isTrial.value);
    this.packageService.packageType.next(this.packageService.packageType.value);
  }
}
