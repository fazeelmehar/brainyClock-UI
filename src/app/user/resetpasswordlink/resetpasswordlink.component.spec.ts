import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordlinkComponent } from './resetpasswordlink.component';

describe('ResetpasswordlinkComponent', () => {
  let component: ResetpasswordlinkComponent;
  let fixture: ComponentFixture<ResetpasswordlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
