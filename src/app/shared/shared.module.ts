import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DayOfWeekNamePipe } from './day-of-week-name.pipe';
import { StopClickPropagation } from './stop-click-propagation.directive';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [DayOfWeekNamePipe, StopClickPropagation],
  imports: [CommonModule, HttpClientModule, HttpClientModule],
  providers: [WeatherService],
  exports: [DayOfWeekNamePipe, StopClickPropagation],
})
export class SharedModule {}
