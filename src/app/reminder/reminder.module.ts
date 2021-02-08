import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReminderComponent } from './reminder.component';
import { StoreModule } from '@ngrx/store';
import * as fromReminder from './store/reminder.reducer';

@NgModule({
  declarations: [ReminderComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromReminder.reminderFeatureKey,
      fromReminder.reducer
    ),
  ]
})
export class ReminderModule { }
