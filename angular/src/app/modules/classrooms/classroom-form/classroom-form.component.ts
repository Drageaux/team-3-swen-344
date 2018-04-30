import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Classroom } from '../classroom';
import { ClassroomsService } from '../classrooms.service';

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.css']
})
export class ClassroomFormComponent {
  @Input()
  newClassroom = new Classroom(null, null, null, null);

  @Output()
  create: EventEmitter<Classroom> = new EventEmitter();

  constructor(private classroomsService: ClassroomsService) { }

  createClassroom(form: NgForm) {
    if (form.valid) {
      this.newClassroom.location = form.value.location;
      this.newClassroom.description = form.value.description;
      this.newClassroom.capacity = form.value.capacity;
      this.classroomsService.createClassroom(this.newClassroom)
        .subscribe(data => console.log(data));
      form.reset();
    }
  }

}
