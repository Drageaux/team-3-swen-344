export class Device {
  id: number;
  name: string;
  rentStatus: boolean;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
