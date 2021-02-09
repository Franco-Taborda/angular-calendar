import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {
  private openWeatherMapApiId = environment.openWeatherMapApiId;
  private baseUrl = 'http://api.openweathermap.org/data/2.5/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  fetchCurrentWeather(city: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}weather`,
      {
        params: {
          q: city,
          appid: this.openWeatherMapApiId,
          units: 'metric'
        }
      }
    )
  }

  fetchHistoryWeather(lat: number, lon: number, date: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}onecall/timemachine`,
      {
        params: {
          lat: `${lat}`,
          lon: `${lon}`,
          dt: `${date}`,
          appid: this.openWeatherMapApiId,
          units: 'metric'
        }
      }
    )
  }

  fetchFutureWeather(lat: number, lon: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}onecall`,
      {
        params: {
          lat: `${lat}`,
          lon: `${lon}`,
          exclude: 'current,hourly,minutely,minutely',
          appid: this.openWeatherMapApiId,
          units: 'metric'
        }
      }
    )
  }

}