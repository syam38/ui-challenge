import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { ICustomer } from 'src/app/models/customer';
import { ICustomerOrder } from 'src/app/models/customer-order';

export interface State {
  customers: ICustomer[];
  customerOders: ICustomerOrder[]
  
}

export const reducers: ActionReducerMap<State> = {
  

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
