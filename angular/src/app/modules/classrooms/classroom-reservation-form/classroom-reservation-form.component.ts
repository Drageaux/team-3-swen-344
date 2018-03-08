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
export class ClassroomReservationFormComponent{
  @Input()
  cId = 0;


  testClassroom = new Classroom(this.cId,50,"EAS-2000","Small auditorium");

  newReservation = new Reservation(0,this.cId,null,null,null,null,null,null);//new Reservation(1,this.testClassroom,"Today","Tomorrow","Me","Reserved");

  @Input()
  creating: boolean;

  @Input()
  editableReservation: Reservation = new Reservation(0,this.cId,null,null,null,null,null,null);//new device by default

  @Output()
  create: EventEmitter<Reservation> = new EventEmitter();

  @Output()
  edit: EventEmitter<Reservation> = new EventEmitter();

  constructor(private reservationsService: ReservationsService) { }

  createReservation(form: NgForm) {
    if(form.valid){
      //Classroom
      this.newReservation.classroomId = this.cId;
      this.newReservation.startDate = form.value.resStartDate;
      //endDate
      this.newReservation.endDate = form.value.resEndDate;
      //reservedby
      this.newReservation.reservedBy = form.value.resReservedBy;
      this.newReservation.eventName = form.value.resEventName;
      //this.create.emit(this.newReservation);
      this.reservationsService.createReservation(this.newReservation)
        .subscribe(data => console.log(data));
      form.reset();
    }
  }

  editReservation(form: NgForm){
    if(form.valid){
      //this.editableReservation.id = form.value.resId;
      this.editableReservation.classroomId = this.cId;
      this.editableReservation.startDate = form.value.resStartDate;
      //endDate
      this.editableReservation.endDate = form.value.resEndDate;
      //reservedby
      this.editableReservation.reservedBy = form.value.resReservedBy;
      this.editableReservation.eventName = form.value.eventName;
      //active
      //this.editableReservation.active = form.value.resActive;
      this.edit.emit(this.editableReservation);
    }
  }

  /*private reserves: Reservation[] = [];

  testApi(){
    this.reservationsService.getAllReservations().subscribe(
      reservations => {
        this.reserves = reservations;
      }
    );
  }*/

}
