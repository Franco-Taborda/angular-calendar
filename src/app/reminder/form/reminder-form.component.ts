import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Day } from 'src/app/calendar/calendar';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})

export class ReminderFormComponent implements OnInit {
  selectedDay = this.data;
  reminderForm = this.formBuilder.group({
    id: uuidv4(),
    date: [`${this.selectedDay.date}`],
    description: ['', [Validators.required, Validators.maxLength(30)]],
    city: ['', Validators.required],
    color: ['', Validators.required],
  });


  constructor(
    public dialogRef: MatDialogRef<ReminderFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Day
  ) { }

  ngOnInit() { }

  onSelectColor(color: string) {
    this.reminderForm.controls.color.setValue(color);
  }

  onSubmit(): void {
    if (this.reminderForm.valid) {
      const [hour, minute] = this.reminderForm.value.date.split(':');
      const date = dayjs(this.selectedDay.date).hour(hour).minute(minute);

      this.dialogRef.close({ ...this.reminderForm.value, date })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}