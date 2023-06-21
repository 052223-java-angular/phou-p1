export interface IUser {
  id: string,
  username: string,
  // password: string,
  role: string,
  token: string
}

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    // public password: string,
    public role: string,
    public token: string
  ) { 
  }
}