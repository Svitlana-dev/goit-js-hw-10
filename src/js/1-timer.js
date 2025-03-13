document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("[data-start]");
    startButton.disabled = true;
});

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  clickOpens: true,
  allowInput: false,

  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate > new Date()) {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    } else {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startButton.disabled = true;
    }
  },
};

flatpickr(datePicker, options);

startButton.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  datePicker.disabled = true;

  timerInterval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimerUI(0, 0, 0, 0);
      datePicker.disabled = false;
      startButton.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimerUI(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

datePicker.setAttribute("autocomplete", "off");

datePicker.addEventListener("focus", () => {
  datePicker._flatpickr.open();
});
