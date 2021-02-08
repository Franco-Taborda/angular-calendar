import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar.component';
import * as fromReminder from './reminder.reducer';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature(
      fromReminder.reminderFeatureKey,
      fromReminder.reducer
    ),
  ],
})
export class CalendarModule {}
