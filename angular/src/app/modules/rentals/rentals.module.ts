import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RentalsComponent} from './rentals.component';
import {RentalsService} from "./rentals.service";
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RentalsComponent],
  providers: [RentalsService]
})
export class RentalsModule {
}
