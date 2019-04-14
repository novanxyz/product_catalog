import { Deserializable } from "../interfaces/deserializable.interface";


export class User implements Deserializable {
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
// tslint:disable-next-line: member-ordering
  login: string;
  fullname: string;
  token: string;
  email: string;

  toJSON(){
    return Object.assign({},this);
  }
}
