import { Reminder } from 'src/app/reminder/reminder';
export interface Month {
  id: string; // compose as year-month
  days: Day[];
}

export interface Day {
  dayNumber: number; // Date of the month
  date: string;
  reminders: Reminder[];
  disabled: boolean;
}
