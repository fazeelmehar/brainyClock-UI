import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }
  isShow = false;
  ngOnInit(): void {
  }

  Show() {
    this.isShow = true;
  }
  updateValue(val: boolean) {
    this.isShow = val;
  }

}
