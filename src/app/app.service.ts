import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from './models/customer';
import { ICustomerOrder } from './models/customer-order';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly customersUrl = environment.api_end_point + '/customers';
  readonly customerOrdersUrl = environment.api_end_point + '/orders';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customersUrl);
  }

  getCustomerOrders(customerId: string, startDate: Date, endDate: Date): Observable<ICustomerOrder[]> {
    return this.http.get<ICustomerOrder[]>(this.customerOrdersUrl + '/' + customerId, {
      params: {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      }
    });
  }
}
