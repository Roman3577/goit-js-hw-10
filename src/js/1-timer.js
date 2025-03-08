import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
let userSelectedDate = null;
let timerId = null;


startButton.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}


flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
        timeout: 3000,
      });

      startButton.disabled = true;
    }
  },
});


startButton.addEventListener("click", () => {
  startButton.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      startButton.disabled = true;
      input.disabled = false;
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(timeDifference);
    updateTimerInterface(time);
  }, 1000);
});