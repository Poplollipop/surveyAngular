import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  // 變更日期格式
  changeDataFormat(dateData: Date|null) {
    let year;
    let month;
    let date;

    // 如果日期資料存在
    if (dateData) {
        year = dateData.getFullYear(); // 取得年份
        month = dateData.getMonth() + 1; // 取得月份，getMonth() 會返回 0 到 11 的數字，所以需要加 1
        if (String(month).length == 1) {
            month = '0' + month; // 如果月份只有一位數，則在前面加 0
        }
        date = dateData.getDate(); // 取得日期
        if (String(date).length == 1) {
            date = '0' + date; // 如果日期只有一位數，則在前面加 0
        }
        // 回傳格式為 YYYY-MM-DD
        return year + '-' + month + '-' + date;
    } else {
        // 如果沒有提供日期，回傳空字串
        return '';
    }
}
}
