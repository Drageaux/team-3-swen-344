import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RentalsComponent} from './rentals.component';
import {RentalsService} from "./rentals.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RentalsComponent],
  providers: [RentalsService]
})
export class RentalsModule {
}
