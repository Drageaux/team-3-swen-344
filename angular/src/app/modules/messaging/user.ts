export class User {
  name: string;
  email: string;
  authId: string;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
