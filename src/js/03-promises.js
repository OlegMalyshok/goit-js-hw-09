import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  const inputDelay = parseInt(delay.value);
  const inputStep = parseInt(step.value);
  const inputAmount = parseInt(amount.value);

  for (let i = 0; i < inputAmount; i++) {
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    inputDelay += inputStep;
  }
}

form.addEventListener('submit', onPromiseCreate);
