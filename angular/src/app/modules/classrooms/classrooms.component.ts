import { Component, OnInit } from '@angular/core';

import { Classroom } from './classroom';
import { ReservationsService } from '../reservations/reservations.service';
import { Reservation } from '../reservations/reservation';
import {ClassroomsService} from './classrooms.service';

declare var $;

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
  providers:[ClassroomsService]
})
export class ClassroomsComponent implements OnInit {

  private classroomList: Classroom[] = [];

  constructor(private reservationsService: ReservationsService,
              private classroomsService: ClassroomsService) {
  }

  ngOnInit() {
    this.classroomsService.getAllClassrooms().subscribe(
      classrooms => {
        this.classroomList = classrooms;
      }
    );
  }

  onCreateClassroom(classroom) {
    this.classroomsService.createClassroom(classroom);
  }

  onDeleteClassroom(classroom) {
    this.classroomsService.deleteClassroom(classroom).subscribe(
      classrooms => {
        this.classroomList = classrooms;
      }
    );
  }

  onCreateReservation(reservation) {
    this.reservationsService.createReservation(reservation);
  }

  showReservationModal(id) {
    console.log(id);
    document.getElementById("newReservationFormModal").dataset.id = id;
    $("#newReservationFormModal").modal('show');
  }

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }

  getActive(classroom): boolean {
    if (classroom.reservation[0] !== undefined) {
      if (classroom.reservation[0].hasOwnProperty('active')) {
        return true;
      }
    }
    return false;
  }

}
