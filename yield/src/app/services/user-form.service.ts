import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  username!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  constructor() {}

  getSignupForm() : FormGroup {
    this.createSignupFormControls();
    return this.createSignupFormGroup();
  }

  getLoginForm() : FormGroup {
    this.createLoginFormControls();
    return this.createLoginFormGroup();
  }

  //=== LOGIN FORM

  private createLoginFormControls() {
    this.username = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(2)
    ]);
    this.password = new FormControl('', [
      Validators.required
    ])
  }

  private createLoginFormGroup() : FormGroup {
    return new FormGroup({
      username: this.username,
      password: this.password
    }, [])
  }

  //=== SIGNUP FORM

  private createSignupFormControls() {
    this.username = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(2)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/gm)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
    ])
  }

  private createSignupFormGroup() : FormGroup {
    return new FormGroup({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, [])
  }
}
