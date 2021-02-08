import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'dayOfWeekName',
})
export class DayOfWeekNamePipe implements PipeTransform {
  transform(value: number): string {
    return dayjs().day(value).format('dddd');
  }
}
