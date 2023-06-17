import { Injectable } from '@angular/core';
import { IUser, User } from '../models/IUser';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URI: string = "http://localhost:9001/v1/api"
  User: IUser | undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  register(formData: FormGroup) : Observable<any> {
    return this.httpClient.post<Observable<any>>(`${this.BASE_URI}/auth/register`, formData.value);
  }

  login(formData: FormGroup) : Observable<IUser> {
    return this.httpClient.post<IUser>(`${this.BASE_URI}/auth/login`, formData.value);
  }

  setSessionObj(user: IUser) : void {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getSessionObj() : IUser {
    return JSON.parse(JSON.stringify(sessionStorage.getItem("user")));
  }

}
