import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState, getCustomers, getCustomerOrders } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { fetchCustomers, fetchCustomerOrders } from '../store/actions';
import { ICustomer } from '../models/customer';
import { ICustomerOrder } from '../models/customer-order';
import { CustomerOrderTable } from '../models/customer-order-table';
import { IFilter } from '../models/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customers: ICustomer[];
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
        this.customers = customers;
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

  getCustomerOrders(filterValues: IFilter) {
    this.store$.dispatch(fetchCustomerOrders({
      payload: {
        customerId: filterValues.customerId,
        startDate: filterValues.dateRange.begin,
        endDate: filterValues.dateRange.end
      }
    }));
    this.dateRange = filterValues.dateRange.begin.toLocaleDateString() + '-' +  filterValues.dateRange.end.toLocaleDateString(); 
    this.totalNumberOfDaysSelected = (new Date(filterValues.dateRange.begin).getTime() - new Date(filterValues.dateRange.end).getTime())/(1000 * 3600 * 24);
  }

}
