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
import { ICustomer } from 'src/app/models/customer';
import { ICustomerOrder } from 'src/app/models/customer-order';
import { fetchCustomersSuccess, fetchCustomersFailure, fetchCustomerOrdersFailure, fetchCustomerOrdersSuccess } from '../actions';

export interface AppState {
  customers: ICustomer[];
  customerOrders: ICustomerOrder[]
}

const initialState: AppState = {
  customers: [],
  customerOrders: []
}

export const selectAppState = createFeatureSelector<AppState>('appState');

export const getCustomers = createSelector(
  selectAppState,
  (state: AppState) => state.customers
);

export const getCustomerOrders = createSelector(
  selectAppState,
  (state: AppState) => state.customerOrders
);

const _appReducer = createReducer(initialState,
  on(fetchCustomersSuccess, (state, { payload }) => ({ ...state, customers: payload.customers })),
  on(fetchCustomersFailure, (state, { payload }) => ({ ...state, err: payload.error, customers:[] })),
  on(fetchCustomerOrdersSuccess, (state, { payload }) => ({ ...state, customerOders: payload.customerOrders })),
  on(fetchCustomerOrdersFailure, (state, { payload }) => ({ ...state, err: payload.error, customerOrders:[] })),
);

export function appReducer(state, action) {
  return _appReducer(state, action)
}
