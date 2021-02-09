import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { Reminder } from '../reminder';
import { WeatherService } from 'src/app/shared/weather.service';
import { SubSink } from 'subsink';

interface WeatherInfo {
  temp: number;
  clouds: number;
  visibility: number;
  humidity: number;
}

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {
  private subs = new SubSink();
  selectedReminder: Reminder = this.data.reminder;
  isEdition: boolean = this.data.isEdition;
  displayOnly: boolean = this.data.displayOnly;
  title: string;
  weather: WeatherInfo;
  weatherLoading: boolean;
  weatherError: string;

  reminderForm = this.formBuilder.group({
    id: this.selectedReminder.id || uuidv4(),
    selectedDay: [
      {
        value: this.isEdition || this.displayOnly
          ? dayjs(this.selectedReminder.date).format('YYYY-MM-DD')
          : '',
        disabled: this.displayOnly
      }],
    date: [
      {
        value: this.isEdition || this.displayOnly
          ? dayjs(this.selectedReminder.date).format('HH:mm')
          : '',
        disabled: this.displayOnly,
      },
      Validators.required,
    ],
    description: [
      {
        value: this.selectedReminder.description || '',
        disabled: this.displayOnly,
      },
      [Validators.required, Validators.maxLength(30)],
    ],
    city: [
      {
        value: this.selectedReminder.city || '',
        disabled: this.displayOnly,
      },
      Validators.required,
    ],
    color: [
      {
        value: this.selectedReminder.color || '',
        disabled: this.displayOnly,
      },
      Validators.required,
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<ReminderFormComponent>,
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setTitle();
  }

  ngOnInit() {
    if (this.isEdition || this.displayOnly) {
      this.getWeather();
    }
  }

  private setTitle() {
    this.title = this.isEdition
      ? 'Edit Reminder'
      : this.displayOnly
        ? `Reminder Preview`
        : 'New Reminder';
  }

  onSelectColor(color: string) {
    this.reminderForm.controls.color.setValue(color);
  }

  onSubmitCreate(): void {
    if (this.reminderForm.valid) {
      this.dialogRef.close(this.getCleanReminder());
    }
  }

  onSubmitEdit(): void {
    if (this.reminderForm.valid) {
      this.dialogRef.close(this.getCleanReminder());
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getCleanReminder(): Reminder {
    const formValues = this.reminderForm.value;
    const [hour, minute] = formValues.date.split(':');
    const [year, month, day] = formValues.selectedDay.split('-');
    let date = dayjs(this.selectedReminder.date).hour(parseInt(hour)).minute(parseInt(minute));

    const normalizeString = (str: string) => str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (this.isEdition && formValues.selectedDay) {
      date = date.year(parseInt(year)).month(parseInt(month) - 1).date(parseInt(day));
    }

    const cleanReminder: Reminder = {
      id: formValues.id,
      date: date.toISOString(),
      description: normalizeString(formValues.description),
      city: normalizeString(formValues.city),
      color: normalizeString(formValues.color),
    };

    return cleanReminder;
  }

  getWeather() {
    this.weatherLoading = true;

    this.subs.add(this.weatherService.getCurrentWeather(this.selectedReminder.city).subscribe(currentWeather => {
      const whichService = this.weatherService.whichService(this.selectedReminder.date);

      if (whichService === 'current') {
        this.weatherLoading = false;
        this.weather = {
          temp: Math.round(currentWeather.main.temp),
          clouds: currentWeather.clouds.all,
          visibility: currentWeather.visibility,
          humidity: currentWeather.main.humidity,
        };
      } else {
        const [lat, lon] = [currentWeather.coord.lat, currentWeather.coord.lon];
        const reminderDate = dayjs(this.selectedReminder.date)

        if (whichService === 'history') {
          this.weatherService.getPreviousWeather(lat, lon, reminderDate.unix()).subscribe(historycalWeather => {
            this.weatherLoading = false;
            this.weather = {
              temp: Math.round(historycalWeather.current.temp),
              clouds: historycalWeather.current.clouds,
              visibility: historycalWeather.current.visibility,
              humidity: historycalWeather.current.humidity,
            };
  
          }, error => this.dateNotAvailableErrorHandler());
        } else {
          this.weatherService.getFutureWeather(lat, lon).subscribe(futureWeather => {
            this.weatherLoading = false;
            const reminderDateWeather = futureWeather.daily.find((dayWeather: any) => dayjs(dayWeather.dt * 1000).isSame(reminderDate, 'day'));
            
            if (reminderDateWeather) {
              this.weather = {
                temp: Math.round(reminderDateWeather.temp.day),
                clouds: reminderDateWeather.clouds,
                visibility: 0,
                humidity: reminderDateWeather.humidity,
              };
            } else {
              this.dateNotAvailableErrorHandler();
            }
  
          }, error => this.dateNotAvailableErrorHandler());
        }
      }

    }, error => this.cityErrorHandler(error)));
  }

  cityErrorHandler(error: any) {
    if (error.error.cod === '404') {
      this.weatherError = 'Error - Please check the name of the city';
      this.weatherLoading = false;
    }
  }

  dateNotAvailableErrorHandler() {
    this.weatherError = 'Error - Day information not available';
    this.weatherLoading = false;
  }

}
