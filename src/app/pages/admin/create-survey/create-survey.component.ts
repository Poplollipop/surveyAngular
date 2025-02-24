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
  options: any[];
  answerText: any;
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

  constructor(
    private router: Router,
    private dateservice: DateService,
  ) { }

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
  editStatus: boolean = false;

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


  showAddQuizDialog() {
    const dialogRef = this.dialog.open(OptionDialogComponent, {
      data: {},
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        this.quizId++;
        const newQuiz: QuizData = {
          quizId: this.quizId,
          quizName: result.quizName,
          type: result.type,
          quizMust: result.quizMust,
          options: result.options,
          answerText: result.answerText,
          quizType: result.quizType,
        };
        // console.log(newQuiz);

        this.dataSource.data.push(newQuiz);
        this.dataSource._updateChangeSubscription();
      };
    })

  }

  // 編輯問卷問題
  showEditQuizDialog(element: any) {
    console.log(element);

    const dialogRef = this.dialog.open(OptionDialogComponent, {
      width: '80%',
      data: {
        quizId: element.quizId,
        quizName: element.quizName,
        quizMust: element.quizMust,
        quizType: element.quizType,
        type: element.type,
        options: element.options,
        answerText: element.answerText,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateQuiz: QuizData = {
          quizId: this.quizId,
          quizName: result.quizName,
          type: result.type,
          quizMust: result.quizMust,
          options: result.options,
          answerText: result.answerText,
          quizType: result.quizType,
        }
        console.log(updateQuiz);
        this.dataSource.data.push(updateQuiz);
        this.dataSource._updateChangeSubscription();
        // console.log(result);
      }
    });
  }

  // checkbox標籤
  checkboxLabel(row?: QuizData): string {
    if (!row) {
      return 'select/deselect row';
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.quizId + 1}`;
  }

  displayedColumns: string[] = ['select', 'quizId', 'quizName', 'type', 'quizMust', 'edit'];
  dataSource = new MatTableDataSource<QuizData>();
  selection = new SelectionModel<QuizData>(true, []);




}
