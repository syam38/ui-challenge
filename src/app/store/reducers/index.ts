import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { ICustomer } from 'src/app/models/customer';
import { ICustomerOrder } from 'src/app/models/customer-order';
import { fetchCustomersSuccess, fetchCustomersFailure, fetchCustomerOdersSuccess, fetchCustomerOdersFailure } from '../actions';

export interface State {
  customers: ICustomer[];
  customerOders: ICustomerOrder[]
}

const initialState: State = {
  customers: [],
  customerOders: []
}

const _appReducer = createReducer(initialState,
  on(fetchCustomersSuccess, (state, { payload }) => ({ ...state, customers: payload.customers })),
  on(fetchCustomersFailure, (state, { payload }) => ({ ...state, err: payload.error, customers:[] })),
  on(fetchCustomerOdersSuccess, (state, { payload }) => ({ ...state, customerOders: payload.customerOders })),
  on(fetchCustomerOdersFailure, (state, { payload }) => ({ ...state, err: payload.error, customerOders:[] })),
);

export function appReducer(state, action) {
  return _appReducer(state, action)
}
