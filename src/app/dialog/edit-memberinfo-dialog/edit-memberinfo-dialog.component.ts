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
  selector: 'app-edit-memberinfo-dialog',
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
  templateUrl: './edit-memberinfo-dialog.component.html',
  styleUrl: './edit-memberinfo-dialog.component.scss'
})
export class EditMemberinfoDialogComponent {

  readonly dialogRef = inject(MatDialogRef<EditMemberinfoDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {

  }


  // 會員資料修正
  newAccount!: string;
  newPassword!: string;
  newMail!: string;
  newPhone!: string;

  save() {
    const newMemberInfo = {
      memberInfo:
        [
          {
          account: this.newAccount,
          password: this.newPassword,
          mail: this.newMail,
          phone: this.newPhone,
          age: '25',
        },

        ],
    }
    console.log(newMemberInfo);
    this.dialogRef.close(newMemberInfo);
  }

  cancel() {
    this.dialogRef.close();
  }


}
