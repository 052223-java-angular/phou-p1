import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  title: string = 'Angular App';
  showLogin: boolean = false;
  showSignup: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showSignup = false;
  }

  toggleSignup() {
    this.showSignup = !this.showSignup;
    this.showLogin = false;
  }
}
