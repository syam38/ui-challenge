import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState, getCustomers } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { fetchCustomers } from '../store/actions';
import { ICustomer } from '../models/customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options: ICustomer[];
  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(fetchCustomers());
    this.store$.pipe(select(getCustomers)).subscribe((customers: ICustomer[]) => {
      if (customers.length > 0) {
        this.options = customers;
      }
    })
  }

  onSubmit(form: NgForm) {
    console.log('form', form.value);
  }
}
