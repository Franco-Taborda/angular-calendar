import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ColorPickerModule } from 'ngx-color-picker';
import { MaterialModule } from 'src/app/material.module';

import { ReminderFormComponent } from './form/reminder-form.component';
import { ReminderComponent } from './reminder.component';
import * as fromReminder from './store/reminder.reducer';


@NgModule({
  declarations: [ReminderComponent, ReminderFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ColorPickerModule,
    StoreModule.forFeature(
      fromReminder.reminderFeatureKey,
      fromReminder.reducer
    ),
  ],
})
export class ReminderModule {}
