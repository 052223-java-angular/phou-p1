export interface IHeaderField {
  fieldName: string,
  fieldOrderIndex: number;
}

export class HeaderField implements IHeaderField {
  fieldName!: string;
  fieldOrderIndex!: number; 
}