# AngularCalendar

Angular Calendar is a basic calendar application for the current month. You can add, edit and remove reminders. When clicking the event, the weather will show up but only for a small range of days, otherwise an error message will appear. 

# Installation

Run `npm i` in the projects's root folder

## Running app

- Run `npm start`
- Open the browser on `http://localhost:4200`

## Usage

- You can create, edit and remove reminders **only** on the current month. The reminders outside of the current month will be displayed but you won't be able to edit them.
- To create a reminder: 
  1. Click the green icon next to the day
  2. Add the desired information on each field
  3. To select the color click the color button, then choose a color from the pop up and click the **ok** button
  4. Click **Accept**
- To edit a reminder:
  1. Click the event you want to edit (try not to click the remove icon)
  2. Edit the desider information
  3. Click Accept
- To remove a reminder click the red icon in it
- To remove all reminders from a day, click the red icon on the upper right corner of the day
- The app is capable of receiving reminders from a service. To try this, use the provided service in `fetchReminders.ts` to load mocked data

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running e2e tests

You need to have the application running. If you change the port in which the app is being served (by default it's 4200), you will need to update the environment variable `page_url` located at `/e2e/env/default/default.properties`

- Go to the e2e folder
- Run `npm i`
- You may need to have [Gauge](https://docs.gauge.org/getting_started/installing-gauge.html?os=windows&language=javascript&ide=vscode) installed on your pc 
- You may need to restart the console or IDE
- Run `npm test`
