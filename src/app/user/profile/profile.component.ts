import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tab: string = 'change-password';
  constructor() { }

  ngOnInit(): void {
  }
  openSubscription() {
    this.tab = 'my-subscriptions';
  }
  openPaymentDetails() {
    this.tab = 'payment-details';

  }
  openTransactionHistory() {
    this.tab = 'transaction-history';

  }
  openPasswordSection() {
    this.tab = 'change-password';

  }
}
