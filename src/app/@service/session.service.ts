import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  answerSurveyData!: string;

  constructor() { }
}
