import { DateService } from './../../../@service/date.service';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { OptionDialogComponent } from '../../../dialog/option-dialog/option-dialog.component';


export interface QuizData {
  quizArray?: any[];
  answerText?: any;
  quizName: string;
  quizId: number;
  type: string;
  quizMust: string;
  quizType: string;
}




@Component({
  selector: 'app-create-survey',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatCheckboxModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent {
  selectedIndex = 0;
  surveyName!: string;
  surveyDescription!: string;
  endDateMin: Date | null = null;

  /* 第一個tab變數 */
  startDate: Date | null = null;
  today: Date = new Date();
  endDate: Date | null = null;
  endDateError: boolean = false;
  inputStartDate: any;
  inputEndDate: any;

  /* 第二個tab變數 */
  quizId: number = 0;
  editId: number = 0;
  quizArray!: Array<any>;
  saveQuizArray: Array<any> = [];
  quizOptionId = 0;
  editStatus = false;
  options!: any[];
  answerText: any;
  quizName!: string;
  type!: string;
  quizMust!: string;
  quizType!: string;

  displayedColumns: string[] = ['select', 'quizId', 'quizName', 'type', 'quizMust', 'edit'];
  previewColumns: string[] = ['quizName', 'options', 'type', 'quizMust'];
  dataSource = new MatTableDataSource(this.saveQuizArray);
  selection = new SelectionModel<QuizData>(true, []);



  constructor(
    private router: Router,
    private dateservice: DateService,
  ) { }

  publishSurvey() {
    throw new Error('Method not implemented.');
  }
  saveSurvey() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }


  /* 第一個tab邏輯 */


  // 處理開始時間更改
  startDate_change(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.endDateMin = this.startDate;
    this.validate_error();
  }

  // 處理結束時間更改
  endDate_change(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    this.validate_error();
  }

  // 驗證結束時間是否小於開始時間
  validate_error() {
    if (this.startDate && this.endDate) {
      this.endDateError = this.endDate < this.startDate;
    }
  }

  //返回首頁
  backtohomepage() {
    // alert('確定返回主頁面？離開後將不會保存任何目前已填寫的資料！')
    this.router.navigateByUrl('/admin-homepage')
  }

  /* tab共用邏輯 */


  // 進入下一個Tab按鈕的處理方法
  nextStep() {
    if (!this.surveyName) {
      alert('問卷名稱不得為空！')
      return
    }
    if (!this.surveyDescription) {
      alert('問卷說明不得為空！')
      return
    }
    if (!this.startDate) {
      alert('開始時間不得為空！')
      return
    }
    if (!this.endDate) {
      alert('結束時間不得為空！')
      return
    }
    // 如果當前是第一個或第二個 Tab，則切換到第二個或第三個 Tab
    if (this.selectedIndex <= 1) {
      this.selectedIndex++;
      this.inputStartDate = this.dateservice.changeDataFormat(this.startDate)
      this.inputEndDate = this.dateservice.changeDataFormat(this.endDate)
    }
  }


  // 回到前一個Tab
  backStep() {
    if (this.selectedIndex >= 1) {
      this.selectedIndex--;
    }
  }

  /* 第二個tab邏輯 */

  // 顯示新增問題及選項對話框
  readonly dialog = inject(MatDialog);


  showQuizDialog(quizType: string, editId?: number) {
    const dialogRef = this.dialog.open(OptionDialogComponent, {
      data: { type: this.type, quizType: this.quizType, saveQuizArray: this.saveQuizArray, editStatus: this.editStatus, editId },
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.editStatus) {
          this.saveQuizArray = result;
        }
        // this.editStatus = false;
        this.pushQuizArray();
      }
    });
  }


  pushQuizArray() {
    let newQuizArray = [];
    for (let quiz of this.saveQuizArray) {
      let newOption = [];
      if (quiz.quizType != 'text') {
        for (let array of quiz.quizArray) {
          newOption.push({
            optionName: array.quiz,
            code: array.id
          })
        }
      }
      newQuizArray.push({
        quizId: quiz.quizId,
        quizMust: quiz.quizMust,
        quizName: quiz.quizName,
        quizType: quiz.quizType,
        type: quiz.type,
        options: newOption
      })
    }
    this.dataSource.data = newQuizArray;
  }

  edit(quiz: any) {
    this.editStatus = true;
    this.showQuizDialog(quiz.quizType, quiz.quizId)
    console.log(quiz);

  }

  saveQuiz() {
    if (this.quizName) {

      if (this.quizType != 'text') {
        for (let quizArray of this.quizArray) {
          if (quizArray.quiz.length == 0) {
            alert('選項名稱不能為空');
            return;
          }
        }
      }

      // 判斷是否為編輯為新增，否則為更新
      if (!this.editStatus) {
        this.saveQuizArray.push({
          quizId: this.quizId,
          quizName: this.quizName,
          quizMust: this.quizMust,
          checkBox: false,
          quizType: this.quizType,
          type: this.type,
          quizArray: this.quizArray
        });
        this.quizId++;
      } else {
        let editData;
        for (let quiz of this.saveQuizArray) {
          if (quiz.quizId == this.editId) editData = quiz;
        }
        editData.quizName = this.quizName;
        editData.quizType = this.quizType;
        editData.quizArray = this.quizArray;
        editData.quizMust = this.quizMust;
        editData.type = this.type;
        console.log(editData.type);
        console.log(editData.quizType);


      }
      this.pushQuizArray();
    } else {
      alert('問卷名稱不能為空');
    }
  }

  delete() {
    // 判斷如果當前選項有溝選擇選擇刪除
    for (let i = 0; i < this.saveQuizArray.length; i++) {
      if (this.saveQuizArray[i].checkBox) this.saveQuizArray.splice(i, 1);
    }
    this.pushQuizArray();
  }


}
