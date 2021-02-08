import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DayOfWeekNamePipe } from './day-of-week-name.pipe';
import { StopClickPropagation } from './stop-click-propagation.directive';

@NgModule({
  declarations: [DayOfWeekNamePipe, StopClickPropagation],
  imports: [CommonModule],
  exports: [DayOfWeekNamePipe, StopClickPropagation],
})
export class SharedModule {}
