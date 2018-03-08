import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from '../../reservations/reservation';
import { Classroom } from '../classroom';

@Component({
  selector: 'app-classroom-reservation-form',
  templateUrl: './classroom-reservation-form.component.html',
  styleUrls: ['./classroom-reservation-form.component.css']
})
export class ClassroomReservationFormComponent{

  testClassroom = new Classroom(1,"Test Class","OPEN",5,30);

  newReservation = new Reservation(null,null,null,null,null,null);//new Reservation(1,this.testClassroom,"Today","Tomorrow","Me","Reserved");

  @Input()
  creating: boolean;

  @Input()
  editableReservation: Reservation = new Reservation(null,null,null,null,null,null);//new device by default

  @Output()
  create: EventEmitter<Reservation> = new EventEmitter();

  @Output()
  edit: EventEmitter<Reservation> = new EventEmitter();

  constructor() { }

  createReservation(form: NgForm) {
    if(form.valid){
      this.newReservation.id = form.value.resId;
      //Classroom
      this.newReservation.startDate = form.value.resStartDate;
      //endDate
      this.newReservation.endDate = form.value.resEndDate;
      //reservedby
      this.newReservation.reservedBy = form.value.resReservedBy;
      //active
      this.newReservation.active = form.value.resActive;
      this.create.emit(this.newReservation);
      form.reset();
    }
  }

  editReservation(form: NgForm){
    if(form.valid){
      this.editableReservation.id = form.value.resId;
      this.editableReservation.startDate = form.value.resStartDate;
      //endDate
      this.editableReservation.endDate = form.value.resEndDate;
      //reservedby
      this.editableReservation.reservedBy = form.value.resReservedBy;
      //active
      this.editableReservation.active = form.value.resActive;
      this.edit.emit(this.editableReservation);
    }
  }

}
