export interface IUser {
  username: string,
  password: string,
  role: string,
  token: string
}

export class User implements IUser {
  constructor(
    public username: string,
    public password: string,
    public role: string,
    public token: string
  ) { 
  }
}