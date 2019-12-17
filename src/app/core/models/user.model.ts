import { Deserializable } from "../interfaces/deserializable.interface";


export class User implements Deserializable {
  login: string;
  fullname: string;
  token: string;
  email: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  toJSON() {
    return Object.assign({},this);
  }
}
