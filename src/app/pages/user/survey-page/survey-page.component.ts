import { SessionService } from './../../../@service/session.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../../../@service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-survey-page',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './survey-page.component.html',
  styleUrl: './survey-page.component.scss'
})
export class SurveyPageComponent {

  survey = {
    surveyTitle: '客戶滿意度調查問卷',
    startDate: '2024/11/06',
    endDate: '2024/12/23',
    surveyDescription: '問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明\
              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明\
              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明\
              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明',
    quizArray: [
      {
        quizId: 1,
        quizMust: true,
        quizName: '您對我們的服務品質滿意嗎？',
        quizType: 'single',
        options: [
          { optionName: '非常滿意', code: 'A' },
          { optionName: '滿意', code: 'B' },
          { optionName: '一般', code: 'C' },
          { optionName: '不滿意', code: 'D' },

        ]
      },
      {
        quizId: 2,
        quizMust: true,
        quizName: '您對我們的產品品質滿意嗎？',
        quizType: 'single',
        options: [
          { optionName: '非常滿意', code: 'A' },
          { optionName: '滿意', code: 'B' },
          { optionName: '一般', code: 'C' },
          { optionName: '不滿意', code: 'D' },
        ]
      },
      {
        quizId: 3,
        quizMust: true,
        quizName: '您對我們的客服支援滿意嗎？',
        quizType: 'single',
        options: [
          { optionName: '非常滿意', code: 'A' },
          { optionName: '滿意', code: 'B' },
          { optionName: '一般', code: 'C' },
          { optionName: '不滿意', code: 'D' },
        ]
      },
      {
        quizId: 4,
        quizMust: true,
        quizName: '您對整體體驗的滿意度如何？',
        quizType: 'single',
        options: [
          { optionName: '非常滿意', code: 'A' },
          { optionName: '滿意', code: 'B' },
          { optionName: '一般', code: 'C' },
          { optionName: '不滿意', code: 'D' },
        ]
      },
      {
        quizId: 5,
        quizMust: true,
        quizName: '您是如何得知本公司的？（可多選）',
        quizType: 'multi',
        options: [
          { optionName: '網路廣告', code: 'A' },
          { optionName: '朋友推薦', code: 'B' },
          { optionName: '社交媒體', code: 'C' },
          { optionName: '線下活動', code: 'D' },
          { optionName: '其他', code: 'E' },

        ]
      },
      {
        quizId: 6,
        quizMust: true,
        quizName: '請輸入你的意見',
        quizType: 'text',
        options: []
      },
    ]
  }



  userStatus: boolean = false;
  userName!: string;
  userPhone!: string;
  userEmail!: string;
  userAge!: string;
  surveyTitle!: string;
  startDate!: string;
  endDate!: string;
  surveyDecription!: string;
  quizArray: Array<any> = [];

  constructor(
    private router: Router,
    private loginservice: LoginService,
    private sessionservice: SessionService
  ) { }

  ngOnInit(): void {
    // 訂閱登入狀態
    this.loginservice.login$.subscribe(status => {
      this.userStatus = status;
      console.log(this.userStatus);
    });

    // 初始化問卷
    this.surveyTitle = this.survey.surveyTitle;
    this.startDate = this.survey.startDate;
    this.endDate = this.survey.endDate;
    this.surveyDecription = this.survey.surveyDescription;
    // 判斷service中有無資料
    if (!this.sessionservice.answerSurveyData) {
      this.tidyQuizArray();
    } else {
      // 當有資料的話就要將使用者輸入的資料塞進相對應欄位
      this.surveyTitle = this.sessionservice.answerSurveyData.surveyTitle;
      this.startDate = this.sessionservice.answerSurveyData.startDate;
      this.endDate = this.sessionservice.answerSurveyData.endDate;
      this.surveyDecription = this.sessionservice.answerSurveyData.surveyDecription;
      this.userName = this.sessionservice.answerSurveyData.userName;
      this.userPhone = this.sessionservice.answerSurveyData.userPhone;
      this.userEmail = this.sessionservice.answerSurveyData.userEmail;
      this.userAge = this.sessionservice.answerSurveyData.userAge;
      this.quizArray = this.sessionservice.answerSurveyData.quizArray;
    }
  }

  tidyQuizArray() {
    for (let array of this.survey.quizArray) {
      this.quizArray.push({ ...array, answer: '', radioAnswer: '' });
    }

    for (let newArray of this.quizArray) {
      let options = [];
      for (let option of newArray.options) {
        options.push({ ...option, boxBoolean: false });
      }
      newArray.options = options;
    }

  }

  toStatistics() {
    this.router.navigateByUrl('/statistics')
  }

  toPreviewpage() {
    if (this.checkMust()) {
      this.sessionservice.answerSurveyData = {
        surveyTitle: this.survey.surveyTitle,
        startDate: this.survey.startDate,
        endDate: this.survey.endDate,
        surveyDescription: this.survey.surveyDescription,
        userName: this.userName,
        userPhone: this.userPhone,
        userEmail: this.userName,
        userAge: this.userAge,
        quizArray: this.quizArray,
      }
    }
    this.router.navigateByUrl('/preview-page')
  }

  checkMust(): boolean {
    if (!this.userName || !this.userPhone) {
      alert('請確認必填欄位皆有填寫!');
      return false;
    };

    for (let quiz of this.quizArray) {
      if (quiz.quizMust) {
        if (quiz.quizType == 'multi') {
          let check = false;
          for (let option of quiz.options) {
            if (option.boxBoolean) {
              check = true;
            }
          }

          if (!check) {
            alert('請確認必填皆有填寫');
            return false;
          }

        } else if (quiz.quizType == 'single') {
          if (!quiz.radioAnswer) {
            alert('請確認必填皆有填寫');
            return false;
          }
        } else if (quiz.quizType == 'text ') {
          if (!quiz.answer) {
            alert('請確認必填皆有填寫');
            return false;
          }
        }
      }
    }
    return true;
  }

  backHomepage() {
    this.sessionservice.answerSurveyData = null;
    if (this.userStatus) {
      this.router.navigateByUrl('/admin-homepage');
    }

    if (!this.userStatus) {
      this.router.navigateByUrl('/homepage');
    }
  }

}
