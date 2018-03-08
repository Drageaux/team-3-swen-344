import {Classroom} from '../classrooms/classroom';

export class Reservation {
  constructor(
    public id: number,
    public classroomId: number,
    public startDate: string,
    public endDate: string,
    public reservedBy: string,
    public active: boolean,
    public eventName: string,
    public participants: number
  ) { }
}

