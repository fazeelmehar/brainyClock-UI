import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { User } from 'src/app/model/user.model';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  user: Observable<User>;
  username: string;
  constructor(public packageService: PackageService, private guard: AuthGuard, private router: Router) { }

  ngOnInit(): void {
    this.user = this.guard.UserInfo();
    this.user.subscribe(data =>
      this.username = data.name)
  }
  gotoSubscriptionSuccessfull() {
    this.packageService.isTrial.next(this.packageService.isTrial.value);
    this.packageService.packageType.next(this.packageService.packageType.value);
    this.router.navigate(['/subscription-successfull'])

  }
  print() {
    window.print();
  }
  // exportAsPDF(divId)
  //   {
  //       let data = document.getElementById('divId');
  //       html2canvas(data).then(canvas => {
  //       const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
  //       let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //       // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  //       pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
  //       pdf.save('Filename.pdf');
  //     });
  //   }
}
