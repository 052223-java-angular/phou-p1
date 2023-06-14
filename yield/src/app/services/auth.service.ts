import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
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
    let list: Array<number> = [1, 2, 3]
    return this.httpClient.post<Observable<any>>(`${this.BASE_URI}/auth/register`, formData.value);
  }

  login(formData: FormGroup) : Observable<IUser> {
    console.info(formData.value)
    return this.httpClient.post<IUser>(`${this.BASE_URI}/auth/login`, formData.value);
  }

}
