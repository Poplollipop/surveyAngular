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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-dialog',
  imports: [
    CommonModule,
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

  // 設定初始值
  quizId = 0;
  editId = 0;
  options: string[] = ["", ""];
  quizMust = false;
  quizType = 'single';
  type: string = '單選題';
  answerText: boolean = false;
  quizName!: string;
  quizArray!: Array<any>;
  quizOptionId = 0;
  editStatus = false;
  saveQuizArray: Array<any> = [];



  readonly dialogRef = inject(MatDialogRef<OptionDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);


  constructor() {

  }

  ngOnInit(): void {
    this.saveQuizArray = this.data.saveQuizArray;
    this.editStatus = this.data.editStatus;
    this.editId = this.data.editId;
    if (!this.data.saveQuizArray) {
      this.type = this.data.type;
      this.quizType = this.data.quizType;
    }
    // 初始化 data 檢視是否為編輯，如為編輯問題及選項，將值帶入
    if (this.editStatus) {
      for (let quizArray of this.saveQuizArray) {
        if (quizArray.quizId == this.data.editId) {
          this.quizName = quizArray.quizName;
          this.quizMust = quizArray.quizMust;
          this.quizType = quizArray.quizType;
          this.type = quizArray.type
          this.quizArray = quizArray.quizArray;
        }
      }
    } else {
      for (let quizArray of this.saveQuizArray) {
        this.quizId = quizArray.quizId;
      }
      this.quizId++;
      if (this.quizType != 'text') this.resetQuizArray();
    }
  }
  resetQuizArray() {
    // 初始設定預設兩個選項
    this.quizOptionId = 1;
    if (this.quizType !== 'text') {
      this.quizArray = [
        { id: 0, quest: '' },
        { id: 1, quest: '' }
      ];
    } else {
      this.quizArray = [];
    }
  }

  removeQuiz(index: number) {
    if (this.quizArray.length > 1) {
      this.quizArray.splice(index, 1);
    }
  }

  addQuiz() {
    this.quizOptionId++;
    this.quizArray.push(
      { id: this.quizOptionId, quest: '' }
    );
  }

  // 變更問題類型為單選題
  setSingle() {
    this.quizType = 'single';
    this.type = '單選題'
    this.quizArray = [
      { id: 0, quest: '' },
      { id: 1, quest: '' }
    ];
  }

  // 變更問題類型為多選題
  setMulti() {
    this.quizType = 'multi';
    this.type = '多選題'
    this.quizArray = [
      { id: 0, quest: '' },
      { id: 1, quest: '' }
    ];
  }

  // 變更問題類型為簡答題
  setText() {
    this.quizType = 'text';
    this.type = '簡答題'
    this.quizArray = [];
  }


  deleteOptions(index: number) {
    if (this.options.length > 2) {
      this.options.splice(index, 1);
    } else {
      alert("選擇題至少需要兩個選項！");
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


    if (this.quizName) {
      let type = this.type;
      let quizType = this.quizType
      if (this.quizType != 'text') {
        for (let quizArray of this.quizArray) {
          if (quizArray.quest.length == 0) {
            alert('選項不能為空！');
            return;
          }
        }
      }

      // 判斷是否編輯否則執行新增或資料更新
      if (!this.editStatus) {
        this.saveQuizArray.push({
          quizId: this.quizId,
          quizName: this.quizName,
          quizMust: this.quizMust,
          quizType: this.quizType,
          type: this.type,
          quizArray: this.quizArray
        });
        this.quizId++;
      } else {
        let editData;
        for (let quest of this.saveQuizArray) {
          if (quest.quizId == this.editId) editData = quest;
        }
        editData.quizName = this.quizName;
        editData.quizType = this.quizType;
        editData.type = this.type;
        editData.quizArray = this.quizArray;
        editData.quizMust = this.quizMust;
        this.editStatus = false;
        // this.dataSource.data = editData
      }
      this.dialogRef.close(this.saveQuizArray);
      console.log(this.saveQuizArray);

    }
  }


  cancel() {
    this.dialogRef.close();
  }

}
