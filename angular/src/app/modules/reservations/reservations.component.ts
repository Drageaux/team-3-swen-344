import { Component, OnInit } from '@angular/core';

import { Reservation } from './reservation';
import { Classroom } from "../classrooms/classroom";

declare var $;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  private reservationList: Reservation[] = [];

  constructor() {
    let class0 = new Classroom(0, "Class-0", "OPEN", 0, 30);
    let res0 = new Reservation(0, class0, new Date().toLocaleDateString(), new Date().toLocaleDateString(),"test@email.com", "RESERVED");

    this.reservationList = [res0];
  }

  ngOnInit() {
  }

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }
}
