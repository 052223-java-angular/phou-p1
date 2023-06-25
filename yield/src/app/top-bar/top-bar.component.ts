import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IRegisterUser } from '../models/iRegisterUser';
import { ILoginUser } from '../models/ILoginUser';
import { IUser } from '../models/IUser';
import { TradeRecordService } from '../services/trade-record.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  title: string = 'Yield';
  errorMessage: string = "";
  showLogin: boolean = false;
  showSignup: boolean = false;

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  username!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  loginUsername!: FormControl;
  loginPassword!: FormControl;

  @Input() loggedInUser!: IUser;
  @Output() loggedInUserChange = new EventEmitter<IUser>();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tradeRecordService: TradeRecordService
  ) {}

  ngOnInit(): void {
    this.username = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
    ])
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/gm)
    ])
    this.confirmPassword = new FormControl('', [
      Validators.required,
    ])

    this.loginUsername = new FormControl('', [
      Validators.required,
    ])
    this.loginPassword = new FormControl('', [
      Validators.required,
    ])

    this.signupForm = this.formBuilder.group<IRegisterUser>({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
    this.loginForm = this.formBuilder.group<ILoginUser>({
      username: this.loginUsername,
      password: this.loginPassword
    })

  }

  showThenResetHttpErrorMessage(data: string) {
    this.errorMessage = data;
    setTimeout(() => {
      this.errorMessage = "";
    }, 3000);
  }

  login(): void {
    
    this.authService.login(this.loginForm).subscribe({
      next: (res) => {
        this.showLogin = !this.showLogin;
        this.authService.setSessionObj(res);
        this.loggedInUser = res; 
        this.loggedInUserChange.emit(this.loggedInUser);
      }, 
      error: (err) => {
        this.showThenResetHttpErrorMessage(err.error.message);
      },
      complete: () => {
        console.info('complete');
      }
    });
    this.loginForm.reset();
  }

  signup(): void {
    this.authService.register(this.signupForm).subscribe({
      next: (v) => {
        this.toggleLogin();
        this.signupForm.reset();
      }, 
      error: (err) => this.showThenResetHttpErrorMessage(err.error.message),
      complete: () => console.info('complete')
    });
  }

  logoutUser() : void {
    this.authService.logout();
    this.loggedInUserChange.emit(undefined);
    this.tradeRecordService.clearAll();
  }

  closeModal() {
    this.showLogin = false;
    this.showSignup = false;
    this.signupForm.reset();
    this.loginForm.reset();
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showSignup = false;
  }

  toggleSignup() {
    this.showSignup = !this.showSignup;
    this.showLogin = false;
  }
}
