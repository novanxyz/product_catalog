export interface Deserializable {
  deserialize(input: any): this;
  toJSON(): any;
}
