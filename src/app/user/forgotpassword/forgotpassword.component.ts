import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @Input() isShow: boolean;
  isShowRestPasswordLink = false;
  @Output() editedEmitter = new EventEmitter<{}>();

  constructor() { }

  ngOnInit(): void {
  }
  Close() {
    this.isShow = false;
    this.editedEmitter.emit({ forgotPassword: this.isShow, login: true });
  }
  Submit() {
    this.isShowRestPasswordLink = true;
  }
  updateValueFromRestPasswordLink(val: { resetPasswordLink, forgotpassword }) {
    this.isShowRestPasswordLink = val.resetPasswordLink;
    this.isShow = val.forgotpassword;
    if (val.forgotpassword != undefined)
      this.editedEmitter.emit({ forgotPassword: this.isShow, login: false });
  }
}
