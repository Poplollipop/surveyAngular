import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-page',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './survey-page.component.html',
  styleUrl: './survey-page.component.scss'
})
export class SurveyPageComponent {
  constructor(private router: Router) { }

  toStatistics() {
    this.router.navigateByUrl('/statistics')
  }

}
