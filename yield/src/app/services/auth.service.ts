import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User: IUser | undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  register(formData: FormGroup) : Observable<any> {
    return this.httpClient.post<Observable<any>>(`auth/register`, formData.value);
  }

  login(formData: FormGroup) : Observable<any> {
    console.info(formData.value)
    return this.httpClient.post<Observable<any>>(`auth/login`, formData.value);
  }

}
