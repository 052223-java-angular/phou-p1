import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserFormService } from '../services/user-form.service';
import { Observable, of } from 'rxjs';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  title: string = 'Yield';
  modalTitle: string = "";
  showLogin: boolean = false;
  showSignup: boolean = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private userFormService: UserFormService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.userFormService.getSignupForm();
    this.loginForm = this.userFormService.getLoginForm();
  }

  login(): void {
    this.authService.login(this.loginForm).subscribe({
      next: (v) => {
        console.info(v);
        this.loginForm.reset();
        this.showLogin = !this.showLogin;
      }, 
      error: (err) => console.log(err),
      complete: () => {
        console.info('complete');
      }
    });
  }

  signup(): void {
    this.authService.register(this.signupForm).subscribe({
      next: (v) => {
        this.signupForm.reset();
        this.toggleLogin();
      }, 
      error: (err) => console.log(err),
      complete: () => console.info('complete')
    });
  }


  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showSignup = false;
    this.modalTitle = "login"
  }

  toggleSignup() {
    this.showSignup = !this.showSignup;
    this.showLogin = false;
    this.modalTitle = "signup"
  }
}
