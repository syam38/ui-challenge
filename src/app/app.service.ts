import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly customersUrl = environment.api_end_point + '/customers';
  readonly customerOrdersUrl = environment.api_end_point + '/orders';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.customersUrl);
  }

  getCustomerOrders(customerId: number, startDate: Date, endDate: Date) {
    return this.http.get(this.customersUrl + '/'+ customerId, {
      params: {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      }
    });
  }
}
