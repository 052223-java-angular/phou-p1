export interface IHeader {
  name: string,
  position: number
}

export class Header implements IHeader {

  constructor(public name: string, public position: number) { }

}