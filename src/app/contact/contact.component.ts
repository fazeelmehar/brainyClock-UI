import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { RepositoryService } from '../services/repository.service';
import { SpinnerService } from '../services/spinner.service';
import { TostarService } from '../services/tostar.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() isShow: boolean;
  @Output() editedEmitter = new EventEmitter<boolean>();
  contactForm: FormGroup;
  submitted = false;


  constructor(private tostar: TostarService, private spinner: SpinnerService, private formBuilder: FormBuilder, private repo: RepositoryService) {

  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      message: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  get f() { return this.contactForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.spinner.show();
    this.tostar.thankyouforcontactingus();
    this.spinner.hide();

  }

  Close() {
    this.isShow = false;
    this.submitted = false;
    this.contactForm.reset();
    this.editedEmitter.emit(false);
  }
}
