import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassroomsComponent } from './classrooms.component';
import { ClassroomsService } from './classrooms.service';
import { ClassroomReservationFormComponent } from './classroom-reservation-form/classroom-reservation-form.component';
import {ClassroomFormComponent} from "./classroom-form/classroom-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ClassroomsComponent, ClassroomReservationFormComponent, ClassroomFormComponent],
  providers: [ClassroomsService]
})
export class ClassroomsModule { }
