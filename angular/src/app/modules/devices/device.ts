export class Device {
  id: number;
  name: string;
  type: string;
  serial: string;
  rentable: boolean;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
