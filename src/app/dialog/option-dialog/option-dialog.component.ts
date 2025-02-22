import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-option-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './option-dialog.component.html',
  styleUrl: './option-dialog.component.scss'
})
export class OptionDialogComponent {


  options: string[] = ["", ""];
  quizMust!: boolean;
  quizType: string = 'single';
  type: string = '單選題';
  answerText!: string;
  quizName!: string;


  readonly dialogRef = inject(MatDialogRef<OptionDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);




  // 變更問題類型為單選題
  setSingle() {
    this.quizType = 'single';
    this.type = '單選題'
    this.options = ["", ""];
  }

  // 變更問題類型為多選題
  setMulti() {
    this.quizType = 'multi';
    this.type = '多選題'
    this.options = ["", ""];
  }

  // 變更問題類型為簡答題
  setText() {
    this.quizType = 'text';
    this.type = '簡答題'
    this.options = [];
  }



  addOptions() {
    if (this.quizType == 'single' || this.quizType == 'multi') {
      this.options.push("");
    }
  }

  deleteOptions(index: number) {
    if (this.options.length > 2) {
      this.options.splice(index, 1);
    } else {
      alert("至少需要兩個選項！");
    }
  }

  save() {
    // 檢查問題名稱是否空白
    if (!this.quizName || !this.quizName.trim()) {
      alert("請填寫問題名稱！");
      return;
    }


    // 檢查問題類型是否選擇
    if (!this.quizType) {
      alert("請選擇問題類型！");
      return;
    }

    // 簡答題，檢查問題是否有輸入
    if (this.quizType == 'text' && !this.answerText) {
      alert("請輸入問題說明！");
      return;
    }

    // 單選題或多選題，檢查選項是否小於兩個選項
    if ((this.quizType == 'single' || this.quizType == 'multi') && this.options.length < 2) {
      alert("至少需要兩個選項！");
      return;
    }

    // 檢查每個選項是否為空
    for (let option of this.options) {
      if (!option.trim()) {
        alert("選項不能為空！");
        return;
      }
    }
    const option = {
      quizName: this.quizName,
      quizMust: this.quizMust,
      quizType: this.quizType,
      type: this.type,
      options: this.options,
      answerText: this.answerText,
    }
    this.dialogRef.close(option);
    console.log(option);
  }

  cancel() {
    this.dialogRef.close();
  }

}
