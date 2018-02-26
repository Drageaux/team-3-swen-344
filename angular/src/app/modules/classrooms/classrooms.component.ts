import { Component, OnInit } from '@angular/core';

import { Classroom } from './classroom';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {

  private classroomList: Classroom[] = [];
  

  constructor() {
    // create mock data
    let class0 = new Classroom(0, "Class-0", "OPEN", 0, 30);
    let class1 = new Classroom(0, "Class-1", "UNAVAILABLE", 12, 30);
    let class2 = new Classroom(0, "Class-2", "RESERVED", 10, 20);

    this.classroomList = [class0, class1, class2];
  }

  ngOnInit() {
  }

}
