import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from '../../reservations/reservation';
import { Classroom } from '../classroom';
import { ReservationsService } from '../../reservations/reservations.service';

@Component({
  selector: 'app-classroom-reservation-form',
  templateUrl: './classroom-reservation-form.component.html',
  styleUrls: ['./classroom-reservation-form.component.css']
})
export class ClassroomReservationFormComponent {
  @Input()
  cId = 0;
  newReservation = new Reservation(0, this.cId,null,null,null,null,null,null);//new Reservation(1,this.testClassroom,"Today","Tomorrow","Me","Reserved");

  @Output()
  create: EventEmitter<Reservation> = new EventEmitter();

  @Output()
  edit: EventEmitter<Reservation> = new EventEmitter();

  constructor(private reservationsService: ReservationsService) { }

  createReservation(form: NgForm) {
    if (form.valid) {
      //Classroom
      this.newReservation.classroomId = this.cId;
      this.newReservation.startDate = form.value.resStartDate;
      //endDate
      this.newReservation.endDate = form.value.resEndDate;
      this.newReservation.eventName = form.value.resEventName;
      //this.create.emit(this.newReservation);
      this.reservationsService.createReservation(this.newReservation)
        .subscribe(data => console.log(data));
      form.reset();
    }
  }

}
