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
  dateRange: string;
  orderCount: number;
  totalNumberOfDaysSelected: number;
  finalPrice: number;
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

  }

  onSubmit(form: NgForm) {
    console.log('form', form);
    const customerId = form.value.customerId;
    const startDate: Date = form.value.daterange.begin;
    const endDate: Date = form.value.daterange.end;
    this.dateRange = startDate.toLocaleDateString() + '-' +  endDate.toLocaleDateString(); 
    this.totalNumberOfDaysSelected = (new Date(form.value.daterange.end).getTime() - new Date(form.value.daterange.begin).getTime())/(1000 * 3600 * 24);
    this.store$.dispatch(fetchCustomerOrders({
      payload: {
        customerId: customerId,
        startDate: startDate,
        endDate: endDate
      }
    }));
  }
}
