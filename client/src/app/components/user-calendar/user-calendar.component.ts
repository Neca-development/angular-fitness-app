import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarDate, Lesson } from '../../models/models';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserCalendarComponent implements OnInit {
  constructor() {}
  locale: string = 'ru';

  myDatePickerOptions: IAngularMyDpOptions;

  @Input() lessons: Lesson;
  ngOnInit() {
    this.myDatePickerOptions = {
      dateRange: false,
      inline: true,
      dateFormat: 'dd.mm.yyyy',

      markDates: [
        {
          dates: this.converteDates(this.lessons.visited),
          styleClass: 'user-calendar__good-date',
        },
        {
          dates: this.converteDates(this.lessons.comming),
          styleClass: 'user-calendar__normal-date',
        },
        {
          dates: this.converteDates(this.lessons.missing),
          styleClass: 'user-calendar__warn-date',
        },
      ],
    };
  }

  converteDates(arr) {
    const dates = [];

    arr.forEach((el) => {
      let date: CalendarDate = { year: 0, month: 0, day: 0 };
      let elDate = new Date(el);
      date.year = elDate.getFullYear();
      date.month = elDate.getMonth() + 1;
      date.day = elDate.getDate();

      dates.push(date);
    });

    return dates;
  }
}
