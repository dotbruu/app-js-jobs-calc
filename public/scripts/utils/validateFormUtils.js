const SHOW_ERROR_MESSAGES = 'show-error-message';

function hideMessageError(form) {
  form
    .querySelectorAll('.' + SHOW_ERROR_MESSAGES)
    .forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGES));
}

function showErrorMessage(input, msg) {
  const formFilds = input.parentElement;
  const errorMessage = formFilds.querySelector('.error-message');

  errorMessage.innerText = msg;

  formFilds.classList.add(SHOW_ERROR_MESSAGES);
}

function checkForEmptyFields(...inputs) {
  inputs.forEach((input) => {
    !input.value && showErrorMessage(input, 'Esse campo não pode estar vazio');
  });
}

function removeSpaces(...inputs) {
  inputs.forEach((input) => {
    input.value = input.value.trim();
  });
}

function shouldSendForm(form) {
  let send = true;

  form
    .querySelectorAll('.' + SHOW_ERROR_MESSAGES)
    .forEach(() => (send = false));

  return send;
}
