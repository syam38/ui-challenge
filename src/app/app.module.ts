import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { StoreModule, State, ActionReducer, MetaReducer } from '@ngrx/store';
import { appReducer, AppState } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { environment } from 'src/environments/environment';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
 
export const metaReducers: MetaReducer<any>[] = environment.production ? []: [debug];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerOrdersComponent,
    CustomerFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    StoreModule.forRoot({ 'appState': appReducer }, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
