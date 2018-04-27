export class Device {
  id: number;
  name: string;
  type: string;
  serial: string;
  rentStatus: boolean;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
