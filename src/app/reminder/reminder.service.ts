import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { v4 as uuidv4 } from 'uuid';

import { Reminder } from 'src/app/reminder/reminder';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  constructor() {}

  fetchReminders(): Observable<Reminder[]> {
    return of(this.reminderMock()).pipe(delay(1000));
  }

  private reminderMock(): Reminder[] {
    const reminders: Reminder[] = [
      {
        id: uuidv4(),
        date: dayjs('2021-01-31').toISOString(),
        description: "Last month's last day",
        city: 'Córdoba',
        color: '#00ff00',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-01-07').toISOString(),
        description: 'Some description - 7',
        city: 'Córdoba',
        color: '#0000ff',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-02-01').toISOString(),
        description: 'First event of the month',
        city: 'Córdoba',
        color: '#ff0000',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-02-12T07:00:00.000Z').toISOString(),
        description: 'Pack of reminders #0 Third',
        city: 'Córdoba',
        color: '#ff0000',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-02-12T04:00:00.000Z').toISOString(),
        description: 'Pack of reminders #1 First',
        city: 'Córdoba',
        color: '#fff000',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-02-12T04:50:00.000Z').toISOString(),
        description: 'Pack of reminders #2 Second',
        city: 'Córdoba',
        color: '#fff0f0',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-02-12T23:00:00.000Z').toISOString(),
        description: 'Pack of reminders #3 Fourth',
        city: 'Córdoba',
        color: '#fffff0',
      },
      {
        id: uuidv4(),
        date: dayjs().toISOString(),
        description: 'This Happens Today!!',
        city: 'Córdoba',
        color: '#fffff0',
      },
      {
        id: uuidv4(),
        date: dayjs('2021-03-01T03:00:00.000Z').toISOString(),
        description: "Next mont's first event!",
        city: 'Córdoba',
        color: '#fffff0',
      },
    ];

    return reminders;
  }
}
