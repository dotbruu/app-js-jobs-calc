const form = document.querySelector('form');
const name = document.querySelector('#name');
const dailyHours = document.querySelector('#daily-hours');
const totalHours = document.querySelector('#total-hours');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  hideMessageError(this);
  checkForEmptyFields(name, dailyHours, totalHours);
  removeSpaces(name);

  shouldSendForm(this) && form.submit();
});
