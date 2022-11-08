import { IMEntity } from '../librairie/IMEntity';

export class Pokemon implements IMEntity<number> {
  constructor(private _id: number, public name: string) {}
  get id(): number {
    return this._id;
  }
}
