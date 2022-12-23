import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentoptionComponent } from './paymentoption.component';

describe('PaymentoptionComponent', () => {
  let component: PaymentoptionComponent;
  let fixture: ComponentFixture<PaymentoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
