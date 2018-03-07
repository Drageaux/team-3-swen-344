import { Component, OnInit } from '@angular/core';

import { Reservation } from './reservation';
import { Classroom } from '../classrooms/classroom';
import {ReservationsService} from './reservations.service';

declare var $;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ReservationsService]
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationsService: ReservationsService) {
    let class0 = new Classroom(0, 'Class-0', 'OPEN', 0, 30);
    let class2 = new Classroom(2, 'Class-2', 'OPEN', 10, 20);

    let res0 = new Reservation(0, class0, new Date().toLocaleDateString(), new Date().toLocaleDateString(), 'test@email.com', 'RESERVED');
    let res1 = new Reservation(1, class2, new Date().toLocaleDateString(), new Date().toLocaleDateString(), 'test123@email.com', 'RESERVED');

    this.reservations = [res0, res1];
  }

  ngOnInit() {
    this.reservationsService.getAllReservations().subscribe()(
      reservations => {
        this.reservations = reservations;
      }
    );
  }

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }
}
