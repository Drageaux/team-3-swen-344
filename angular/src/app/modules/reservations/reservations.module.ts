import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { ReservationsService } from './reservations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReservationsComponent],
  providers: [ReservationsService]
})
export class ReservationsModule { }
