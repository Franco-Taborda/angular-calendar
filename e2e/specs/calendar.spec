# Calendar
* Go to main page
* Must display "Sunday"
* Must display "Monday"
* Must display "Tuesday"
* Must display "Wednesday"
* Must display "Thursday"
* Must display "Friday"
* Must display "Saturday"

## Create Reminder
* Click create today
* Must display "NEW REMINDER"
* Focus on textBox with name "description"
* Write "This is a new reminder"
* Focus on textBox with name "city"
* Write "new york"
* Focus on input with name "time" inside label
* Write "2223"
* Click button with text "Click To Choose Color"
* Focus on element with query "color-picker .hex-text .box input"
* Clear text
* Write "#FF7F50"
* Click element with query ".color-picker.open button"
* Click button with text "Accept"
* Click text "This is a new reminder"
* Must display "This is a new reminder"
* Must display "new york"
* Must display "22:23"
* Color buton must have color "rgb(255, 0, 0)"

## Delete Reminder
* Click create today
* Must display "NEW REMINDER"
* Focus on textBox with name "description"
* Write "This is a new reminder"
* Focus on textBox with name "city"
* Write "new york"
* Focus on input with name "time" inside label
* Write "2223"
* Click button with text "Click To Choose Color"
* Focus on element with query "color-picker .hex-text .box input"
* Clear text
* Write "#FF7F50"
* Click element with query ".color-picker.open button"
* Click button with text "Accept"
* Must display "This is a new reminder"
* Click element with query ".calendar__cell__reminders__item button"
* Must not display "This is a new reminder"