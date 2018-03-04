import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { appRoutingProviders, routing } from './app.routing';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

import { SampleModule } from './modules/sample/sample.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { HomeModule } from './modules/home/home.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    SampleModule,
    HomeModule,
    ClassroomsModule,
    ReservationsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
