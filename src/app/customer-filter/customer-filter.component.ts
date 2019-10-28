import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '../models/customer';
import { IFilter, IDateRange } from '../models/filter';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnChanges {
  @Input() customers: ICustomer[]
  options: ICustomer[];
  @Output() emitfilterValues: EventEmitter<IFilter> = new EventEmitter();
  filterValues: IFilter;
  selectedCustomer: ICustomer;
  date: IDateRange;
  selectedDateRangeString: string;

  constructor() { }

  ngOnChanges() {
    if (this.customers && this.customers.length > 0) {
      this.options = this.customers;
      if (localStorage.getItem('selectedCustomerId')) {
        this.selectedCustomer = this.customers.filter((c) => c.id === localStorage.getItem('selectedCustomerId'))[0];
      }
      if (localStorage.getItem('selectedDateRange')) {
        const selectedDateRangeString: IDateRange = JSON.parse(localStorage.getItem('selectedDateRange'));
        this.date = {
          begin: new Date(selectedDateRangeString.begin),
          end: new Date(selectedDateRangeString.end)
        };
      }
    }
  }

  onSubmit() {
    localStorage.setItem('selectedCustomerId', this.selectedCustomer.id);
    localStorage.setItem('selectedDateRange', JSON.stringify(this.date));
    this.emitfilterValues.emit({
      customerId: this.selectedCustomer.id,
      dateRange: {
        begin: this.date.begin,
        end: this.date.end
      }
    });
  }

}
