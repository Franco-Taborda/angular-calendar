import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as dayjs from 'dayjs';
import { Reminder } from 'src/app/reminder/reminder';

export interface State extends EntityState<Reminder> {
  selectedReminderId: number | null;
}

export function sortByDate(a: Reminder, b: Reminder): number {
  return dayjs(a.date).isBefore(dayjs(b.date))
    ? -1
    : dayjs(a.date).isAfter(dayjs(b.date))
      ? 1
      : 0;
}

export const adapter: EntityAdapter<Reminder> = createEntityAdapter<Reminder>({
  sortComparer: sortByDate,
});
