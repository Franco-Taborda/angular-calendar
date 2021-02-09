import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, of } from 'rxjs';
import { OpenWeatherMapService } from './open-weather.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private openWeatherMapService: OpenWeatherMapService) {}

  /**
   * Compares the selected date with the current date
   * @param date selected date
   */
  whichService(date: string): string {
    const reminderDate = dayjs(date);
    const today = dayjs();

    return reminderDate.isSame(today, 'day')
      ? 'current'
      : reminderDate.isBefore(today, 'day')
        ? 'history'
        : 'future';
  }

  /**
   * Fetches current city weather
   * @param city city name
   */
  getCurrentWeather(city: string): Observable<any> {
    return this.openWeatherMapService.fetchCurrentWeather(city);
  }

  /**
   * Fetches historical weather information
   * @param lat city latitude
   * @param lon city longitude
   * @param date unix date time
   */
  getPreviousWeather(lat: number, lon: number, date: number): Observable<any> {
    return this.openWeatherMapService.fetchHistoryWeather(lat, lon, date);
  }

  getFutureWeather(lat: number, lon: number): Observable<any> {
    return this.openWeatherMapService.fetchFutureWeather(lat, lon);
  }
}
