import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() isShow: boolean;
  @Output() editedEmitter = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {

  }

  Close() {
    this.isShow = false;
    this.editedEmitter.emit(false);
  }
}
