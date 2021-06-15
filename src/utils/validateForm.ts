function validateForm(form: HTMLFormElement | null, cb?: (isValid: boolean) => void) {
  if (!form) {
    throw new Error('Не найдена форма для валидации');
  }

  const isValid = form.checkValidity();

  if (!cb) {
    // Стандартное поведение валидации
    const submitButton: HTMLButtonElement | null = form.querySelector('[type=submit]');
    if (isValid && submitButton) {
      submitButton.disabled = false;
    } else if (submitButton) {
      submitButton.disabled = true;
    }
  } else {
    // Колбек для нестандартной реакции на валидацию
    cb(isValid);
  }
}

export default validateForm;
