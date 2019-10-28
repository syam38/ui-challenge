import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterComponent } from './customer-filter.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerFilterComponent', () => {
  let component: CustomerFilterComponent;
  let fixture: ComponentFixture<CustomerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFilterComponent ],
      imports: [
        FormsModule,
        MatSelectModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
