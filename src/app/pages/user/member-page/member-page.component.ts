import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { EditMemberinfoDialogComponent } from '../../../dialog/edit-memberinfo-dialog/edit-memberinfo-dialog.component';

@Component({
  selector: 'app-member-page',
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.scss'
})
export class MemberPageComponent {

  file!: File;
  img: any;

  memberInfo = {
    memberInfo: [
      {
        account: 'example',
        password: '12345',
        mail: 'example@yahoo.com',
        phone: '0912345678',
        age: '25',
      }
    ]
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.memberInfo);

  }

  // 顯示會員資料編輯對話框

  readonly dialog = inject(MatDialog);

  showDialog() {
    const dialogRef = this.dialog.open(EditMemberinfoDialogComponent, {
      data: {},
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.memberInfo = result
      }
    })
  }

  // 返回首頁

  backHomepage() {
    this.router.navigateByUrl('/homepage')
  }

  // 下方兩方法為圖片轉換base64(文字)方法，等待接API保存至資料庫
  convert() {
    // 檢查 file 是否為空
    if (!this.file) {
      alert('請選擇檔案進行上傳');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
      // console.log(this.img);
    }
    reader.readAsDataURL(this.file);
  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }



}
