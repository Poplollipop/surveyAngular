import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  imports: [
    MatButtonModule,

  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

  quizData: any

  survey = {
    surveyTitle: '客戶滿意度調查問卷',
    startDate: '2024/11/06',
    endDate: '2024/12/23',
    quizArray: [
      {
        quizId: '1',
        quizName: '您對我們的服務品質滿意嗎？',
        quizType: 'single',
        labels: ['非常滿意', '滿意', '一般', '不滿意'],
        data: [500, 300, 400, 100],
        color: ['red', 'blue', 'green','orange']
      },
      {
        quizId: '2',
        quizMust: true,
        quizName: '您對我們的產品品質滿意嗎？',
        quizType: 'single',
        labels: ['非常滿意', '滿意', '一般', '不滿意'],
        data: [100, 100, 600, 100],
        color: ['red', 'blue', 'green','orange']
      },
      {
        quizId: '3',
        quizMust: true,
        quizName: '您對我們的客服支援滿意嗎？',
        quizType: 'single',
        labels: ['非常滿意', '滿意', '一般', '不滿意'],
        data: [200, 300, 400, 100],
        color: ['red', 'blue', 'green','orange']
      },
      {
        quizId: '4',
        quizMust: true,
        quizName: '您對整體體驗的滿意度如何？',
        quizType: 'single',
        labels: ['非常滿意', '滿意', '一般', '不滿意'],
        data: [200, 300, 400, 100],
        color: ['red', 'blue', 'green','orange']
      },
      {
        quizId: '5',
        quizMust: true,
        quizName: '您是如何得知本公司的？（可多選）',
        quizType: 'multi',
        labels: ['非常滿意', '滿意', '一般', '不滿意'],
        data: [200, 300, 400, 100],
        color: ['red', 'blue', 'green','orange']
      },
      {
        quizId: '6',
        quizMust: true,
        quizName: '請輸入你的意見',
        quizType: 'text',
        labels: [],
        data: ['無', '我喜歡一個長得像彭于晏的店員', '男哥最帥了！'],
        color: ['red', 'blue', 'green','orange']
      },
    ]
  }
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    for (let index = 0; index < this.survey.quizArray.length; index++) {
      this.quizData = this.survey.quizArray[index];


        // console.log(quizData);


        // 獲取 canvas 元素
        let ctx = document.getElementById(this.quizData.quizId) as HTMLCanvasElement;
        // console.log(ctx);

        // 設定數據
        let data = {
          // x 軸文字
          labels: this.quizData.labels,
          datasets: [
            {
              // 數據
              data: this.quizData.data,
              // 線與邊框顏色
              backgroundColor: this.quizData.color,
              //設定hover時的偏移量，滑鼠移上去表會偏移，方便觀看選種的項目
              hoverOffset: 4,
            },
          ],
        };
        console.log(data);


        if (ctx) {
          // 創建圖表
          let chart = new Chart(ctx, {
            //pie是圓餅圖,doughnut是環狀圖
            type: 'doughnut',
            data: data,
          });
        }
      }
  }

  backHomepage() {
    this.router.navigateByUrl('/admin-homepage')
  }

  backSurveypage() {
    this.router.navigateByUrl('/survey-page')
  }

}
