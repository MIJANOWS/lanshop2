import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmOrderIdComponent } from './adm-order-id.component';

describe('AdmOrderIdComponent', () => {
  let component: AdmOrderIdComponent;
  let fixture: ComponentFixture<AdmOrderIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmOrderIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmOrderIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
