const form = document.querySelector('form');
const name = document.querySelector('#name');
const avatar = document.querySelector('#avatar');
const monthlyBudget = document.querySelector('#monthly-budget');
const hoursPerDay = document.querySelector('#hours-per-day');
const daysPerWeek = document.querySelector('#days-per-week');
const vacationPerYear = document.querySelector('#vacation-per-year');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  hideMessageError(this);
  checkForEmptyFields(
    name,
    avatar,
    monthlyBudget,
    hoursPerDay,
    daysPerWeek,
    vacationPerYear,
  );
  removeSpaces(name, avatar);

  shouldSendForm(this) && form.submit();
});
