import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() isShow: boolean;
  @Output() editedEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  Close() {
    this.isShow = false;
    this.editedEmitter.emit(false);
  }
}
