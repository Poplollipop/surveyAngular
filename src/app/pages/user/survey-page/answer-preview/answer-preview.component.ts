import { Router } from '@angular/router';
import { SessionService } from './../../../../@service/session.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-answer-preview',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './answer-preview.component.html',
  styleUrl: './answer-preview.component.scss'
})
export class AnswerPreviewComponent {

  answerData: any

  constructor(
    private sessionservice: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.answerData = this.sessionservice.answerSurveyData
    console.log(this.answerData);

  }

  backSurveypage(){
    this.router.navigateByUrl('/survey-page')
  }

  submit(){
    this.sessionservice.answerSurveyData = null;
    const answerData = {

    }
    this.router.navigateByUrl('/thanks-reply');
  }

}
