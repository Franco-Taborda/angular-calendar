import { Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Reminder } from './model/month';

export const loadReminders = createAction(
  '[Reminder/API] Load Reminders',
  props<{ reminders: Reminder[] }>()
);
export const addReminder = createAction(
  '[Reminder/API] Add Reminder',
  props<{ reminder: Reminder }>()
);
export const setReminder = createAction(
  '[Reminder/API] Set Reminder',
  props<{ reminder: Reminder }>()
);
export const updateReminder = createAction(
  '[Reminder/API] Update Reminder',
  props<{ update: Update<Reminder> }>()
);
export const updateReminders = createAction(
  '[Reminder/API] Update Reminders',
  props<{ updates: Update<Reminder>[] }>()
);
export const deleteReminder = createAction(
  '[Reminder/API] Delete Reminder',
  props<{ id: string }>()
);
export const deleteRemindersByPredicate = createAction(
  '[Reminder/API] Delete Reminders By Predicate',
  props<{ predicate: Predicate<Reminder> }>()
);
