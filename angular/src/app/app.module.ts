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
import { ClassroomsModule } from './modules/classrooms/classrooms.module';


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
    ClassroomsModule
  ],
  providers: [appRoutingProviders, SampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
