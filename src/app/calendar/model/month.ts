export interface Month {
  id: string; // compose as year-month
  days: Day[];
}

export interface Day {
  dayNumber: number; // Date of the month
  date: string;
  reminders: Reminder[];
  disabled?: boolean;
}

export interface Reminder {
  id: string;
  date: string;
  description: string;
  city: string;
  color: string;
}
