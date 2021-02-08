import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ReminderModule } from 'src/app/reminder/reminder.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, SharedModule, MaterialModule, ReminderModule],
})
export class CalendarModule {}
