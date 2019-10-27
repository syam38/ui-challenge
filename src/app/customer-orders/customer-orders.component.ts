import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ICustomerOrder } from '../models/customer-order';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnChanges {
  displayedColumns = ['recipientName', 'emailAddress', 'totalPrice', 'orderedDate', 'itemNames', 'deliveryDetails'];
  dataSource: MatTableDataSource<ICustomerOrder>;
  @Input() data: ICustomerOrder[];
  noData = false;
  constructor() { }


  ngOnChanges() {
    if (this.data && this.data.length > 0) {
      this.dataSource = new MatTableDataSource(this.data);
      this.noData = false;
    } else {
      this.noData = true;
    }
  }

}
