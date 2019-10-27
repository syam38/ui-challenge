import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '../models/customer';
import { IFilter, IDateRange } from '../models/filter';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit, OnChanges {
  @Input() customers: ICustomer[]
  options: ICustomer[];
  @Output() emitfilterValues: EventEmitter<IFilter> = new EventEmitter();
  filterValues: IFilter;


  constructor() { }

  ngOnChanges() {
    this.options = this.customers;
  }

  ngOnInit() {
  }

  // dateChange(dateRange: IDateRange) {
  //   this.filterValues.dateRange = {
  //     begin: dateRange.begin,
  //     end: dateRange.end
  //   };
  // }

  onSubmit(form: NgForm) {
    const _customerId = form.value.customerId;
    const _startDate: Date = form.value.daterange.begin;
    const _endDate: Date = form.value.daterange.end;
    this.emitfilterValues.emit({
      customerId: _customerId,
      dateRange: {
        begin: _startDate,
        end: _endDate
      }
    });
  }

}
