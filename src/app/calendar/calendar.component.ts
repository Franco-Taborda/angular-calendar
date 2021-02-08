import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { take } from 'rxjs/internal/operators';
import { SubSink } from 'subsink';
import { v4 as uuidv4 } from 'uuid';

import { Day, Month, Reminder } from './model/month';
import * as ReminderActions from './reminder.actions';
import * as ReminderSelectors from './reminder.selectors';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  reminders: Reminder[];
  currentMonth: Month;
  loading: boolean;
  today = dayjs();

  // calendar: Month[];

  constructor(
    private calendarService: CalendarService,
    private store: Store<{ reminders: Reminder[] }>
  ) {
    this.initializeCalendar();

    this.subs.add(
      this.store
        .pipe(select(ReminderSelectors.selectAllReminders))
        .subscribe((reminders: Reminder[]) => {
          this.reminders = reminders;
          this.setReminders();
        })
    );
  }

  ngOnInit(): void {
    this.loading = true;

    this.calendarService
      .fetchReminders()
      .pipe(take(1))
      .subscribe((result: Reminder[]) => {
        this.store.dispatch(
          ReminderActions.loadReminders({ reminders: result })
        );
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initializeCalendar() {
    const firstMonthDay = dayjs().startOf('month').hour(0).minute(0).second(0);
    const [currentMonth, previousMonth, nextMonth] = [
      this.buildMonth(firstMonthDay),
      this.buildMonth(firstMonthDay.subtract(1, 'month')),
      this.buildMonth(firstMonthDay.add(1, 'month')),
    ];

    this.currentMonth = currentMonth;

    // this.calendar = [currentMonth, previousMonth, nextMonth];
  }

  private buildMonth(monthDate: dayjs.Dayjs) {
    const previousMonthLastDate = monthDate.subtract(1, 'month').endOf('month');
    const nextMonthFirstDay = monthDate.add(1, 'month').startOf('month');
    const days = [];

    // Getting previous month days
    for (let i = 0; i < monthDate.day(); i++) {
      days.unshift(
        this.buildDay(previousMonthLastDate.subtract(i, 'day'), true)
      );
    }

    // Getting current month days
    for (let i = 1; i <= monthDate.daysInMonth(); i++) {
      days.push(this.buildDay(monthDate.add(i - 1, 'day')));
    }

    const remainingDays = 42 - (monthDate.day() + monthDate.daysInMonth());

    // Getting next month days
    for (let i = 0; i < remainingDays; i++) {
      days.push(this.buildDay(nextMonthFirstDay.add(i, 'day'), true));
    }

    const newMonth: Month = {
      id: monthDate.format('YYYY-MM'),
      days,
    };

    return newMonth;
  }

  buildDay(date: dayjs.Dayjs, disabled = false): Day {
    const day: Day = {
      dayNumber: date.date(),
      date: date.toISOString(),
      reminders: [],
      disabled,
    };

    return day;
  }

  /**
   * Returns a filtered array of reminders by query using the selected date
   * @param reminderArr Array of reminders
   * @param date string used to build a date
   * @param query unit to query. It must be type accepted by dayjs
   */
  private filterByDate(
    reminderArr: Reminder[],
    date: string,
    query: any
  ): Reminder[] {
    return reminderArr.filter((reminder) =>
      dayjs(reminder.date).isSame(dayjs(date), query)
    );
  }

  private setReminders() {
    this.currentMonth.days.forEach((day: Day) => {
      const currentDayReminders = this.filterByDate(
        this.reminders,
        day.date,
        'day'
      );

      if (currentDayReminders.length) {
        day.reminders = currentDayReminders;
      } else {
        day.reminders = [];
      }

      return day;
    });
  }

  testWathever() {
    const newReminder: Reminder = {
      id: uuidv4(),
      date: dayjs().toISOString(),
      description: `${dayjs().format('mm:ss')}`,
      city: 'Córdoba',
      color: '#fffff0',
    };

    this.store.dispatch(ReminderActions.addReminder({ reminder: newReminder }));
  }

  removeSelectedReminder(reminderId: string) {
    this.store.dispatch(ReminderActions.deleteReminder({ id: reminderId }));
  }

  removeAllDayReminders(day: string) {
    const predicate = (reminder: Reminder) =>
      dayjs(reminder.date).isSame(day, 'day');

    this.store.dispatch(
      ReminderActions.deleteRemindersByPredicate({ predicate })
    );
  }
}
