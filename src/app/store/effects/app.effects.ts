import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppService } from 'src/app/app.service';
import { fetchCustomers, fetchCustomerOdersSuccess, fetchCustomersSuccess, fetchCustomersFailure } from '../actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
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
          error: error
        }
      }))
    })
  ));

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }
}
