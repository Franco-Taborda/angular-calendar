import { Action, createReducer, on } from '@ngrx/store';

import * as ReminderActions from './reminder.actions';
import { adapter, State } from './reminder.entity';

export const initialState: State = adapter.getInitialState({
  selectedReminderId: null,
});

const reminderReducer = createReducer(
  initialState,
  on(ReminderActions.addReminder, (state, { reminder }) => {
    return adapter.addOne(reminder, state);
  }),
  on(ReminderActions.setReminder, (state, { reminder }) => {
    return adapter.setOne(reminder, state);
  }),
  on(ReminderActions.updateReminder, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(ReminderActions.updateReminders, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(ReminderActions.deleteReminder, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ReminderActions.deleteRemindersByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(ReminderActions.loadReminders, (state, { reminders }) => {
    return adapter.setAll(reminders, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return reminderReducer(state, action);
}

export const getSelectedReminderId = (state: State) => state.selectedReminderId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectReminderIds = selectIds;

export const selectReminderEntities = selectEntities;

export const selectAllReminders = selectAll;

export const selectReminderTotal = selectTotal;

export const reminderFeatureKey = 'reminders';
