import { Component, Input } from '@angular/core';
import { IUser } from './models/IUser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular app';
  @Input() user!: IUser;

  constructor(
    private authService : AuthService
  ) {}

  toggleLineChart() : void {

  }

  toggleBarChart() : void {

  }

  toggleMarketCard() : void {

  }



}
