import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {appRoutingProviders, routing} from './app.routing';
import { AuthService } from './auth/auth.service';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './not-found.component';

import {HomeModule} from './modules/home/home.module';
import {ReservationsModule} from './modules/reservations/reservations.module';
import {RentalsModule} from "./modules/rentals/rentals.module";
import {ClassroomsModule} from './modules/classrooms/classrooms.module';
import {DevicesModule} from './modules/devices/devices.module';
import {MessagingModule} from './modules/messaging/messaging.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    HomeModule,
    ReservationsModule,
    RentalsModule,
    ClassroomsModule,
    DevicesModule,
    MessagingModule
  ],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
