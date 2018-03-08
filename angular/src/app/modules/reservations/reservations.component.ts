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
    let reservation0 = new Reservation(0,0,"Today","Tomorrow","Me",true,"CSCI-141",24);//0, "Class-0", "OPEN", 0, 30, "GOL-1400");
    let reservation1 = new Reservation(1,1,"Tomorrow","The day after tomorrow","Some Professor",true,"FNRT-200",21);//1, "Class-1", "UNAVAILABLE", 12, 30, "GAN-1337");
    let reservation2 = new Reservation(2,2,"2 Days Ago","Next Monday","Some other professor",true,"FOOD-153", 29);//2, "Class-2", "RESERVED", 10, 20, "GOS-2550");
    this.reservations = [reservation0,reservation1,reservation2];
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

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }
}
