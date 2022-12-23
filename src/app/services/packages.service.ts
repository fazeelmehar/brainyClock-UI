import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PackageType } from '../enum/packagetype.enum';
import { Package } from '../model/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packageType = new BehaviorSubject<PackageType | undefined>(undefined);
  isTrial = new BehaviorSubject<boolean | undefined>(undefined);
  private packages: Package[];
  constructor() {
    this.packages = [];
    this.package();
  }

  get(packageType?: PackageType): Package {
    if (packageType != null) {
      return this.packages.find(x => x.type == packageType);
    }
  }
  private package() {
    this.packages.push({ type: PackageType.Base, users: 1, employees: 5, location: 1, price: 29.99 });
    this.packages.push({ type: PackageType.Startup, users: 1, employees: 10, location: 2, price: 69.99 });
    this.packages.push({ type: PackageType.Enterprise, users: 2, employees: 20, location: 3, price: 119.99 });
  }
  getPackageName(packageType: PackageType) {
    return PackageType[packageType];
  }
  dateOfPurchase() {
    return new Date();
  }
  subscriptionValidTill() {
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  }
  trialTill() {
    return new Date(new Date().setMonth(new Date().getMonth() + 1))
  }
  pacakeFinalPrice(packageType?: PackageType) {
    if (this.isTrial.value)
      return "00.00";
    return parseFloat((this.packages.find(x => x.type == packageType).price * 12).toString()).toFixed(2)
  }
}
