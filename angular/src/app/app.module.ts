import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { Router } from '@angular/router';
import { appRoutingProviders, routing } from './app.routing';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

import { SampleModule } from './modules/sample/sample.module';
import { SampleService } from "./modules/sample/sample.service";

import { DevicesModule } from './modules/devices/devices.module';
import { DevicesService } from './modules/devices/devices.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    routing,
    SampleModule,
    DevicesModule
  ],
  providers: [appRoutingProviders, SampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
