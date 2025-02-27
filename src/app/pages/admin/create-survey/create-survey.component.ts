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
  startDateSelected: boolean = false;
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
    this.startDateSelected = true;
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
    const confirmed = confirm('確定返回主頁面？離開後將不會保存任何目前已填寫的資料！')
    if (confirmed) {
      this.router.navigateByUrl('/admin-homepage')
    }
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
          this.dataSource.data = this.saveQuizArray;
        }
        if (this.editStatus) {
          this.saveQuizArray = result;
          this.dataSource.data = this.saveQuizArray;
          this.editStatus = false;
        }
      }
    });
  }




  edit(quiz: any) {
    this.editStatus = true;
    this.showQuizDialog(quiz.quizType, quiz.quizId)
  }


  deleteOptions() {
    // 從後向前遍歷，避免有漏掉
    for (let i = this.saveQuizArray.length - 1; i >= 0; i--) {
      if (this.saveQuizArray[i].checkBox) {
        this.saveQuizArray.splice(i, 1);
      }
    }
    // 遍歷 this.saveQuizArray 陣列找到 quizId更新
    this.saveQuizArray.forEach((quiz, index) => {
      quiz.quizId = index + 1;
    });

    this.dataSource.data = this.saveQuizArray;
    console.log(this.dataSource.data);

  }


}
