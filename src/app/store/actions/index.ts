import { createAction, props } from '@ngrx/store';
import { ICustomer } from 'src/app/models/customer';
import { ICustomerOrder } from 'src/app/models/customer-order';

export const fetchCustomers = createAction('[App] Fetch Customers');
export const fetchCustomersSuccess = createAction('[App] Fetch Customers Success', props<{payload: { customers: ICustomer[] }}>());
export const fetchCustomersFailure = createAction('[App] Fetch Customers Failure', props<{payload: { error: Error }}>());
export const fetchCustomerOdersSuccess = createAction('[App] Fetch Customer Orders Success', props<{payload: { customerOders: ICustomerOrder[] }}>());
export const fetchCustomerOdersFailure = createAction('[App] Fetch Customer Orders Failure', props<{payload: { error: Error }}>());