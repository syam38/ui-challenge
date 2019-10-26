import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState, getCustomers, getCustomerOrders } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { fetchCustomers, fetchCustomerOrders } from '../store/actions';
import { ICustomer } from '../models/customer';
import { ICustomerOrder } from '../models/customer-order';
import { CustomerOrderTable } from '../models/customer-order-table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options: ICustomer[];
  customerOrders: CustomerOrderTable[];
  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(fetchCustomers());
    this.store$.pipe(select(getCustomers)).subscribe((customers: ICustomer[]) => {
      if (customers.length > 0) {
        this.options = customers;
      }
    })
    this.store$.pipe(select(getCustomerOrders)).subscribe((customerOrders: ICustomerOrder[]) => {
      if (customerOrders.length > 0) {
        this.customerOrders = customerOrders.map((co) => new CustomerOrderTable(co));
      }
    })

  }

  onSubmit(form: NgForm) {
    const customerId = form.value.customerId;
    const startDate = form.value.daterange.begin;
    const endDate = form.value.daterange.end;
    this.store$.dispatch(fetchCustomerOrders({
      payload: {
        customerId: customerId,
        startDate: startDate,
        endDate: endDate
      }
    }));
  }
}
