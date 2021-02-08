import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DayOfWeekNamePipe } from './day-of-week-name.pipe';

@NgModule({
  declarations: [DayOfWeekNamePipe],
  imports: [CommonModule],
  exports: [DayOfWeekNamePipe],
})
export class SharedModule {}
