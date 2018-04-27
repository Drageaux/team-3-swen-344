export class Message {
  id: number;
  fromId: number;
  toId: number;
  dateCreated: string;
  title: string;
  message: string;
  deleted: boolean;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
