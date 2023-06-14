import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css'],
})
export class AnalyticComponent {
  @Input() showLineChart: boolean = false;
  @Input() showBarChart: boolean = false;
}
