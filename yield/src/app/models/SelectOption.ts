export interface ISelectOption {
  name: string,
  slot: number,
}

export class SelectOption implements ISelectOption {

  constructor(
    public name: string = '',
    public slot: number
  ) {}
  
}