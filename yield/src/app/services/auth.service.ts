import { Injectable } from '@angular/core';
import { IUser, User } from '../models/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser | undefined;
  BASE_URI = environment.apiBaseUrl;
  // create an HttpHeader with user credentials

  constructor(
    private httpClient: HttpClient
  ) { }

  // register(formData: FormGroup) : Observable<any> {
  //   return this.httpClient.post<Observable<any>>(
  //     `${this.BASE_URI}/auth/register`, formData.value, { headers: this.configAuthHeader()});
  // }

  // login(formData: FormGroup) : Observable<IUser> {
  //   return this.httpClient.post<IUser>(
  //     `${this.BASE_URI}/auth/login`, formData.value, { headers: this.configAuthHeader()});
  // }


  register(formData: FormGroup) : Observable<any> {
    return this.httpClient.post<Observable<any>>(
      `${this.BASE_URI}/api/auth/register`, formData.value, { headers: this.configAuthHeader()});
  }

  login(formData: FormGroup) : Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${this.BASE_URI}/api/auth/login`, formData.value, { headers: this.configAuthHeader()});
  }

  private configAuthHeader() : HttpHeaders {
    return new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",
    });
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
