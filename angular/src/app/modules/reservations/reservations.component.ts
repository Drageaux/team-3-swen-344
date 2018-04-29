import { Component, OnInit } from '@angular/core';

import { Reservation } from './reservation';
import { ReservationsService } from './reservations.service';

declare var $;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ReservationsService]
})
export class ReservationsComponent implements OnInit {

  private reservations: Reservation[] = [];

  constructor(private reservationsService: ReservationsService) {
  }

  ngOnInit() {
    this.reservationsService.getAllReservations().subscribe(
      reservations => {
        this.reservations = reservations;
      }
    );
  }

  onCancelReservation(reservation) {
    this.reservationsService.cancelReservation(reservation).subscribe(
      reservations => {
        this.reservations = reservations;
      }
    );
  }
  onDeleteReservation(reservation) {
    this.reservationsService.deleteReservation(reservation).subscribe(
      reservations => {
        this.reservations = reservations;
      }
    );
  }

  testApi(){
    this.reservationsService.getAllReservations().subscribe(
      reservations => {
        this.reservations = reservations;
      }
    );
  }

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }
}
