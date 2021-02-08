import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { ReminderModule } from '../reminder/reminder.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReminderModule
  ],
})
export class CalendarModule {}
