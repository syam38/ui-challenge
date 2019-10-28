import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState, getCustomers, getCustomerOrders } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { fetchCustomers, fetchCustomerOrders } from '../store/actions';
import { ICustomer } from '../models/customer';
import { ICustomerOrder } from '../models/customer-order';
import { CustomerOrderTable } from '../models/customer-order-table';
import { IFilter } from '../models/filter';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  customers: ICustomer[];
  customerOrders: CustomerOrderTable[];
  dateRange: string;
  orderCount: number;
  totalNumberOfDaysSelected: number;
  finalPrice: number;
  destroy$ = new Subject();

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.pipe(takeUntil(this.destroy$), select(getCustomers)).subscribe((customers: ICustomer[]) => {
      if (customers.length > 0) {
        this.customers = customers;
        localStorage.setItem('customers', JSON.stringify(customers));
      }
    })
    this.store$.pipe(select(getCustomerOrders)).subscribe((customerOrders: ICustomerOrder[]) => {
      if (customerOrders.length > 0) {
        localStorage.setItem('customerOrders', JSON.stringify(customerOrders));
        let totalItemPrice = 0;
        let totalDeliveryPrice = 0;
        this.customerOrders = customerOrders.map((co) => {
          const a = new CustomerOrderTable(co);
          totalItemPrice += a.totalPrice;
          totalDeliveryPrice += parseInt(co.charge_customer.total_price)
          return a;
        });
        this.orderCount = this.customerOrders.length;
        this.finalPrice = totalItemPrice + totalDeliveryPrice;
      }
    })
    if (!(this.customers && this.customers.length > 0)) {
      this.store$.dispatch(fetchCustomers());
    }
  }

  getCustomerOrders(filterValues: IFilter) {
    this.store$.dispatch(fetchCustomerOrders({
      payload: {
        customerId: filterValues.customerId,
        startDate: filterValues.dateRange.begin,
        endDate: filterValues.dateRange.end
      }
    }));
    this.dateRange = filterValues.dateRange.begin.toLocaleDateString() + '-' + filterValues.dateRange.end.toLocaleDateString();
    this.totalNumberOfDaysSelected = (new Date(filterValues.dateRange.begin).getTime() - new Date(filterValues.dateRange.end).getTime()) / (1000 * 3600 * 24);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
