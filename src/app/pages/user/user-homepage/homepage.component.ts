import { DateService } from './../../../@service/date.service';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SearchComponent } from '../../../component/search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../@service/login.service';


@Component({
  selector: 'app-homepage',
  imports: [
    RouterLink,
    FormsModule,
    SearchComponent,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  // selectSurvey: boolean = false;
  // 登入判斷
  userStatus: boolean = false;

  constructor(
    private paginatorInt: MatPaginatorIntl,   // 更改 Angular paginator 語言
    private loginservice: LoginService,
    private dateservice: DateService
  ) {
    // 更改 Angular paginator文字顯示
    {
      paginatorInt.itemsPerPageLabel = "每頁顯示資料數";
      paginatorInt.nextPageLabel = "下一頁";
      paginatorInt.previousPageLabel = "上一頁";
      paginatorInt.lastPageLabel = "到最後一頁";
      paginatorInt.firstPageLabel = "到第一頁";
      paginatorInt.getRangeLabel = (page: number, pageSize: number, length: number) => {
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex =
          startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;
        return `${endIndex} / ${length}`; // ${startIndex + 1} 的
      }
    }
  }

  // 搜尋條件更改
  changeData(event: any) {
    const startDate = this.dateservice.changeDataFormat(new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day));
    const endDate = this.dateservice.changeDataFormat(new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day));
    const searchData = {
      surveyName: event.surveyName,
      startDate: startDate,
      endDate: endDate,
    }
    console.log(searchData);
  }



  displayedColumns: string[] = ['surveyId', 'name', 'status', 'startTime', 'endTime'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // 訂閱登入狀態
    this.loginservice.login$.subscribe(status => {
      this.userStatus = status;
    });
    // console.log(this.userStatus);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }







}

export interface PeriodicElement {
  name: string;
  surveyId: number;
  status: string;
  startTime: string;
  endTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { surveyId: 1, name: '客戶滿意度調查', status: '尚未開始', startTime: '2024-02-15 08:00', endTime: '2024-02-20 18:00' },
  { surveyId: 2, name: '產品使用反饋', status: '進行中', startTime: '2024-02-10 09:30', endTime: '2024-02-17 20:00' },
  { surveyId: 3, name: '員工工作環境調查', status: '已結束', startTime: '2024-01-05 10:00', endTime: '2024-01-12 22:00' },
  { surveyId: 4, name: '市場趨勢分析', status: '尚未開始', startTime: '2024-03-01 07:45', endTime: '2024-03-10 19:30' },
  { surveyId: 5, name: '社交媒體影響力調查', status: '進行中', startTime: '2024-02-05 12:00', endTime: '2024-02-12 21:45' },
  { surveyId: 6, name: '食品安全與健康習慣', status: '已結束', startTime: '2024-01-15 11:15', endTime: '2024-01-22 17:30' },
  { surveyId: 7, name: '線上購物體驗調查', status: '尚未開始', startTime: '2024-03-05 08:30', endTime: '2024-03-12 18:15' },
  { surveyId: 8, name: '交通與通勤方式研究', status: '進行中', startTime: '2024-02-08 09:00', endTime: '2024-02-14 20:00' },
  { surveyId: 9, name: '健康與健身習慣調查', status: '已結束', startTime: '2024-01-20 13:00', endTime: '2024-01-27 23:59' },
  { surveyId: 10, name: '智慧型手機使用行為分析', status: '尚未開始', startTime: '2024-03-10 10:30', endTime: '2024-03-18 22:00' },
  { surveyId: 11, name: '電子支付使用習慣調查', status: '尚未開始', startTime: '2024-03-12 08:00', endTime: '2024-03-20 19:00' },
  { surveyId: 12, name: '餐飲服務滿意度調查', status: '進行中', startTime: '2024-02-10 14:00', endTime: '2024-02-17 23:00' },
  { surveyId: 13, name: '網路安全與隱私保護調查', status: '已結束', startTime: '2024-01-18 10:30', endTime: '2024-01-25 18:00' },
  { surveyId: 14, name: '旅遊消費模式調查', status: '尚未開始', startTime: '2024-02-25 09:00', endTime: '2024-03-05 21:00' },
  { surveyId: 15, name: '人工智慧與自動化技術調查', status: '進行中', startTime: '2024-02-03 11:00', endTime: '2024-02-14 17:00' },
  { surveyId: 16, name: '新產品市場測試調查', status: '已結束', startTime: '2024-01-10 08:30', endTime: '2024-01-17 20:00' },
  { surveyId: 17, name: '個人理財與投資行為調查', status: '尚未開始', startTime: '2024-03-15 08:00', endTime: '2024-03-22 19:00' },
  { surveyId: 18, name: '客戶服務滿意度調查', status: '進行中', startTime: '2024-02-07 10:00', endTime: '2024-02-14 18:30' },
  { surveyId: 19, name: '居住環境與房地產市場調查', status: '尚未開始', startTime: '2024-03-20 09:00', endTime: '2024-03-27 20:00' },
  { surveyId: 20, name: '電子產品購買決策調查', status: '進行中', startTime: '2024-02-01 13:00', endTime: '2024-02-10 23:59' }

];




