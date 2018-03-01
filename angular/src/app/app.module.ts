import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { appRoutingProviders, routing } from './app.routing';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

import { SampleModule } from './modules/sample/sample.module';
import { SampleService } from "./modules/sample/sample.service";

import { DevicesModule } from './modules/devices/devices.module';
import { DevicesService } from './modules/devices/devices.service';
import { DevicesComponent } from './modules/devices/devices.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    SampleModule,
    DevicesModule
  ],
  providers: [appRoutingProviders, SampleService, DevicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
