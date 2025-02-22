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

  // 會員資料修正
  newAccount!: string;
  newPassword!: string;
  newMail!: string;
  newPhone!: string;
  newMemberInfo: string[] = []

  save() {
    this.newMemberInfo = [this.newAccount, this.newPassword, this.newMail, this.newPhone];
    console.log(this.newMemberInfo);
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }


}
