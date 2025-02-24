import { Component, inject, output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-search',
  imports: [
    NgbDatepickerModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  calendar: NgbCalendar = inject(NgbCalendar);
  formatter: NgbDateParserFormatter = inject(NgbDateParserFormatter);
  searchOutput = output<any>();

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
  surveyName!: string;

  // bootstrap datepicker 邏輯
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  // output 搜尋條件
  search() {
    const searchFiliter = {
      startDate: this.fromDate,
      endDate: this.toDate,
      surveyName: this.surveyName,
    };
    // console.log(searchFiliter);
    this.searchOutput.emit(searchFiliter);
  }

}
