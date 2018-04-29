export class Rental {
  constructor(
    public id: number,
    public deviceId: number,
    public renterId: number,
    public returnCondition: string, //enum
    public comment: string,
    public rentDate: string, //date
    public dueDate: string, //date
    public returnDate: string //date
  ) { }
}

