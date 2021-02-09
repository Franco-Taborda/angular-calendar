import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { ReminderFormComponent } from 'src/app/reminder/form/reminder-form.component';
import { Reminder } from 'src/app/reminder/reminder';
import * as ReminderActions from 'src/app/reminder/store/reminder.actions';
import * as ReminderSelectors from 'src/app/reminder/store/reminder.selectors';
import { SubSink } from 'subsink';

import { Day, Month } from './calendar';

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

  constructor(
    public dialog: MatDialog,
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // Builds the current month's structure
  private initializeCalendar() {
    const firstMonthDay = dayjs().startOf('month').hour(0).minute(0).second(0);
    this.currentMonth = this.buildMonth(firstMonthDay);
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

  /**
   * Returns the Day object for the current date
   * @param date date of month
   * @param disabled true if the date is outside of the current month
   */
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
   filterByDate (
    reminderArr: Reminder[],
    date: string,
    query: any
  ): Reminder[] {
    return reminderArr.filter((reminder) =>
      dayjs(reminder.date).isSame(dayjs(date), query)
    );
  }

  // Sets the reminders on each visible day
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

  // Removes a single reminder
  removeSelectedReminder(reminderId: string) {
    this.store.dispatch(ReminderActions.deleteReminder({ id: reminderId }));
  }

  // Removes all reminders in a day
  removeAllDayReminders(day: string) {
    const predicate = (reminder: Reminder) =>
      dayjs(reminder.date).isSame(day, 'day');

    this.store.dispatch(
      ReminderActions.deleteRemindersByPredicate({ predicate })
    );
  }

  /**
   * Creates a reminder for a selected day and time
   * @param day day in which to place the reminder
   */
  createReminder(day: Day): void {
    if (!day.disabled) {
      const reminder: Reminder = {
        id: '',
        date: day.date,
        description: '',
        city: '',
        color: '',
      };

      const dialogRef = this.dialog.open(ReminderFormComponent, {
        data: {
          reminder,
          isEdition: false,
          displayOnly: false,
        },
      });

      dialogRef.afterClosed().subscribe((newReminder) => {
        if (newReminder) {
          this.store.dispatch(
            ReminderActions.addReminder({ reminder: newReminder })
          );
        }
      });
    }
  }

  /**
   * Updates a selected reminder with user entered description, date, time, city and color
   * @param reminder Reminder to edit
   */
  editReminder(reminder: Reminder): void {
    const dialogRef = this.dialog.open(ReminderFormComponent, {
      data: {
        reminder,
        isEdition: true,
        displayOnly: false,
      },
    });

    dialogRef.afterClosed().subscribe((editedReminder) => {
      if (editedReminder) {
        this.store.dispatch(
          ReminderActions.updateReminder({
            update: { id: editedReminder.id, changes: editedReminder },
          })
        );
      }
    });
  }

  /**
   * Displays a reminder (read only). Made for out of the current month's reminders
   * @param reminder Reminder to display
   */
  displayReminder(reminder: Reminder) {
    this.dialog.open(ReminderFormComponent, {
      data: {
        reminder,
        isEdition: false,
        displayOnly: true,
      },
    });
  }
}
