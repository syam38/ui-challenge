import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppService } from 'src/app/app.service';
import {
  fetchCustomers, fetchCustomersSuccess,
  fetchCustomersFailure, fetchCustomerOrders, fetchCustomerOrdersSuccess, fetchCustomerOrdersFailure
} from '../actions';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  loadCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCustomers),
    mergeMap(() => this.appService.getCustomers()),
    map((res) => (fetchCustomersSuccess({
      payload: {
        customers: res
      }
    }))),
    catchError((error) => {
      return of(fetchCustomersFailure({
        payload: {
          error
        }
      }));
    })
  ));

  loadCustomerOrders$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCustomerOrders),
    switchMap((action) => this.appService.getCustomerOrders(action.payload.customerId, action.payload.startDate, action.payload.endDate)),
    map((res) => (fetchCustomerOrdersSuccess({
      payload: {
        customerOrders: res
      }
    }))),
    catchError((error) => {
      return of(fetchCustomerOrdersFailure({
        payload: {
          error
        }
      }));
    })
  ));

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }
}
