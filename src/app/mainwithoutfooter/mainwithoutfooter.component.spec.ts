import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainwithoutfooterComponent } from './mainwithoutfooter.component';

describe('MainwithoutfooterComponent', () => {
  let component: MainwithoutfooterComponent;
  let fixture: ComponentFixture<MainwithoutfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainwithoutfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainwithoutfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
