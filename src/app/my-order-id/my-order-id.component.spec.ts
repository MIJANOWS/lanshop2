import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderIdComponent } from './my-order-id.component';

describe('MyOrderIdComponent', () => {
  let component: MyOrderIdComponent;
  let fixture: ComponentFixture<MyOrderIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
