import { Component, OnInit } from '@angular/core';

import { Classroom } from './classroom';
import { ReservationsService } from '../reservations/reservations.service';
import { Reservation } from '../reservations/reservation';

declare var $;

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {

  private classroomList: Classroom[] = [];
  
  private reserves: Reservation[] = [];

  constructor(private reservationsService: ReservationsService) {
    // create mock data
    let class0 = new Classroom(0,200,"GOL-1400","A large auditorium.");//0, "Class-0", "OPEN", 0, 30, "GOL-1400");
    let class1 = new Classroom(1,30,"GAN-1337","An art studio.");//1, "Class-1", "UNAVAILABLE", 12, 30, "GAN-1337");
    let class2 = new Classroom(2,40,"GOS-2550", "Chemisty lab.");//2, "Class-2", "RESERVED", 10, 20, "GOS-2550");

    this.classroomList = [class0, class1, class2];
  }

  ngOnInit() {
  }

  onCreateReservation(reservation){
    this.reservationsService.createReservation(reservation);
  }

  testApi(){
    this.reservationsService.getAllReservations().subscribe(
      reservations => {
        this.reserves = reservations;
      }
    );
  }

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }

}
