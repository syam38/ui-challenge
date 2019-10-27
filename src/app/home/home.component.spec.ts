import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CustomerOrdersComponent } from '../customer-orders/customer-orders.component';
import { CustomerFilterComponent } from '../customer-filter/customer-filter.component';
import { MatTableModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store, createAction } from '@ngrx/store';
import { appReducer, AppState, getCustomerOrders } from '../store/reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../app.service';
import { of } from 'rxjs';
import { ICustomer } from '../models/customer';
import { AppEffects } from '../store/effects/app.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ICustomerOrder } from '../models/customer-order';
import { CustomerOrderTable } from '../models/customer-order-table';
import { fetchCustomers, fetchCustomerOrders } from '../store/actions';
import { IFilter } from '../models/filter';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<AppState>
  let storeSpy;
  let appService: AppService;

  const customersResponse: ICustomer[] = [
    {
      id: 'cust-1',
      email: 'x@y.com',
      name: 'Mr.x'
    }
  ];

  const customerOrdersResponse: ICustomerOrder[] = [
    {
      id: "order-1",
      recipient: {
        name: "John Smith",
        email: "j.smith@notgmail.com"
      },
      created_at: "2018-11-01T09:42:30Z",
      delivery: {
        courier: "DPP", method: "Express"
      },
      items: [{
        id: "item-1",
        name: "Supersoaker 3000",
        quantity: 2,
        total_price: { currency: "EUR", amount: "24.33" }
      }
      ],
      charge_customer: { currency: "EUR", total_price: "18.00" }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CustomerOrdersComponent,
        CustomerFilterComponent,
      ],
      imports: [
        MatTableModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        StoreModule.forRoot({ 'appState': appReducer }),
        EffectsModule.forRoot([AppEffects]),
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        AppService
      ]
    })
      .compileComponents();
    store = TestBed.get(Store);
    appService = TestBed.get(AppService);
    spyOn(appService, 'getCustomers').and.returnValue(of(customersResponse));
    spyOn(appService, 'getCustomerOrders').and.returnValue(of(customerOrdersResponse));
    storeSpy = spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetch customers action on load', () => {
    expect(storeSpy).toHaveBeenCalledWith(fetchCustomers());
  });

  it('should set the component\'s "customers" variable with the data from AppService', () => {
    expect(component.customers).toEqual(customersResponse);
  });

  it('should dispatch fetch customer orders action on getCustomerOrders function call', () => {
    const filterValues: IFilter = {
      customerId: 'cust-1',
      dateRange: {
        begin: new Date(),
        end: new Date()
      }
    };
    component.getCustomerOrders(filterValues);
    expect(storeSpy).toHaveBeenCalledWith(fetchCustomerOrders({
      payload: {
        customerId: filterValues.customerId,
        startDate: filterValues.dateRange.begin,
        endDate: filterValues.dateRange.end
      }
    }));
  });

  it('should set the component\'s "customerOrders" variable with the transformed data from AppService\'s getCustomerOrders on getCustomerOrders function call', () => {
    component.getCustomerOrders({
      customerId: 'cust-1',
      dateRange: {
        begin: new Date(),
        end: new Date()
      }
    });
    const expectedResponse = customerOrdersResponse.map((co) => {
      return new CustomerOrderTable(co);
    });
    expect(component.customerOrders).toEqual(expectedResponse);
  });

});
