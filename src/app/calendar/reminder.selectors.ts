import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as dayjs from 'dayjs';

import { Reminder } from './model/month';
import * as ReminderEntity from './reminder.entity';
import * as fromReminder from './reminder.reducer';

export interface State {
  reminders: ReminderEntity.State;
}

export const reducers: ActionReducerMap<State> = {
  reminders: fromReminder.reducer,
};

export const selectReminderState = createFeatureSelector<ReminderEntity.State>(
  'reminders'
);

export const selectReminderIds = createSelector(
  selectReminderState,
  fromReminder.selectReminderIds // shorthand for remindersState => fromReminder.selectReminderIds(remindersState)
);
export const selectReminderEntities = createSelector(
  selectReminderState,
  fromReminder.selectReminderEntities
);
export const selectAllReminders = createSelector(
  selectReminderState,
  fromReminder.selectAllReminders
);
export const selectReminderTotal = createSelector(
  selectReminderState,
  fromReminder.selectReminderTotal
);
export const selectCurrentReminderId = createSelector(
  selectReminderState,
  fromReminder.getSelectedReminderId
);

export const selectCurrentReminder = createSelector(
  selectReminderEntities,
  selectCurrentReminderId,
  (reminderEntities, reminderId) =>
    reminderId ? reminderEntities[reminderId] : ({} as { [id: string]: any })
);

export const selectRemindersByMonth = createSelector(
  selectAllReminders,
  (entities: Reminder[], props: any) =>
    entities.filter(
      (reminder: Reminder) =>
        dayjs(reminder.date).format('YYYY-MM') === props.month
    )
);

export const selectRemindersByDay = createSelector(
  selectAllReminders,
  (entities: Reminder[], props: any) =>
    entities.filter(
      (reminder: Reminder) =>
        dayjs(reminder.date).format('YYYY-MM-DD') === props.day
    )
);
