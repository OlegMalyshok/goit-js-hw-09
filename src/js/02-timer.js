import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');
let timer = null;

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    const showTimer = () => {
      const crtDate = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      const difference = selectData - crtDate;
      const { days, hours, minutes, seconds } = convertMs(difference);
      daysVal.textContent = days;
      hoursVal.textContent = addLeadingZero(hours);
      minutesVal.textContent = addLeadingZero(minutes);
      secondsVal.textContent = addLeadingZero(seconds);

      if (
        daysVal.textContent === '0' &&
        hoursVal.textContent === '00' &&
        minutesVal.textContent === '00' &&
        secondsVal.textContent === '00'
      ) {
        clearInterval(timer);
      }
    };

    const onClick = () => {
      if (timer) {
        clearInterval(timer);
      }
      showTimer();
      timer = setInterval(showTimer, 1000);
    };

    startBtn.addEventListener('click', onClick);
  },
};

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

flatpickr('#datetime-picker', { ...options });
