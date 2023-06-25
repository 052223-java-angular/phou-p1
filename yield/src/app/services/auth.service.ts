import { Injectable } from '@angular/core';
import { IUser, User } from '../models/IUser';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser | undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  register(formData: FormGroup) : Observable<any> {
    return this.httpClient.post<Observable<any>>(`/auth/register`, formData.value);
  }

  login(formData: FormGroup) : Observable<IUser> {
    return this.httpClient.post<IUser>(`/auth/login`, formData.value);
  }

  logout() : void {
    this.deleteSession();
  }

  deleteSession() : void {
    sessionStorage.clear();
  }

  setSessionObj(user: IUser) : void {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getSessionObj() : IUser | undefined {
    const jsonUser = sessionStorage?.getItem("user");
    return jsonUser ? JSON.parse(jsonUser) : null;
  }

  getIdOfUser() : string | undefined {
    return this.getSessionObj()?.id;
  }

  getUsernameOfUser() : string | undefined {
    return this.getSessionObj()?.username
  }

  getAuthTokenOfUser() : string | undefined {
    return this.getSessionObj()?.token;
  }

  getRoleOfUser() : string | undefined {
    return this.getSessionObj()?.role;
  }

}
