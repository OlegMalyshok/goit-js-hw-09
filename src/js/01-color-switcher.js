const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let color = null;
btnStop.disabled = true;

btnStart.addEventListener('click', onBtnStartChangeColor);
btnStop.addEventListener('click', onBtnStopChangeColor);

function onBtnStartChangeColor() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  color = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopChangeColor() {
  btnStart.disabled = false;
  btnStop.disabled = true;

  clearInterval(color);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
