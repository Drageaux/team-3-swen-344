import {Classroom} from "../classrooms/classroom";

export class Reservation {
  constructor(
    public id: number,
    public classroom: Classroom,
    public startDate: string,
    public endDate: string,
    public reservedBy: string,
    public status: string
  ){ }
}
