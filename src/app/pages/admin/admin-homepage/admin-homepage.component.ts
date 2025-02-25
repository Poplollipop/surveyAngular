import { DateService } from './../../../@service/date.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../../component/search/search.component';
import { LoginService } from '../../../@service/login.service';


@Component({
  selector: 'app-admin-homepage',
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
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.scss'
})
export class AdminHomepageComponent implements AfterViewInit {

  selectSurvey: boolean = false;
  adminStatus: boolean = false;
  selectData!: Array<any>;


  displayedColumns: string[] = ['surveyId', 'name', 'status', 'startTime', 'endTime'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // 更改 Angular paginator 語言
  constructor(
    private paginatorInt: MatPaginatorIntl,
    private loginservice: LoginService,
    private dateservice: DateService,
  ) {
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

  ngOnInit(): void {
    // 訂閱登入狀態
    this.loginservice.login$.subscribe(status => {
      // console.log(status);

      this.adminStatus = status;
    });
    // console.log(this.adminStatus);
    if (this.adminStatus) {
      this.displayedColumns.push('edit');
      this.displayedColumns.unshift('selectSurvey');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    // console.log(searchData);
  }


  deleteSurvey() {
    alert('問卷刪除後將無法復原！！！')
    this.dataSource.data = this.dataSource.data.filter(element => !element.selected);
    // filter 方法返回一個新的陣列
    // 如果 element.selected 是 true（即該項目被選中），!element.selected 會變成 false，這樣該項目會被排除在新陣列之外。
    // 如果 element.selected 是 false（即該項目未被選中），!element.selected 會變成 true，該項目會被保留在新陣列中。
  }


}

export interface PeriodicElement {
  name: string;
  surveyId: number;
  status: string;
  startTime: string;
  endTime: string;
  selected?: boolean;
}

let ELEMENT_DATA: PeriodicElement[] = [
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

