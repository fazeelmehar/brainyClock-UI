import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrybeforebuyComponent } from './trybeforebuy.component';

describe('TrybeforebuyComponent', () => {
  let component: TrybeforebuyComponent;
  let fixture: ComponentFixture<TrybeforebuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrybeforebuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrybeforebuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
