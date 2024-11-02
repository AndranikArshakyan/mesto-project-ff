const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternErrorMessage);
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(
      inputElement.dataset.valueMissingErrorMessage
    );
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${inputSelector}`)
  );
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(`${validationSettings.formSelector}`)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(
      formElement,
      validationSettings.inputSelector,
      validationSettings.submitButtonSelector,
      validationSettings.inputErrorClass,
      validationSettings.errorClass,
      validationSettings.inactiveButtonClass
    );
  });
};

const clearValidation = (formElement, validationSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      validationSettings.inputErrorClass,
      validationSettings.errorClass
    );
    inputElement.setCustomValidity("");
  });

  toggleButtonState(
    inputList,
    buttonElement,
    validationSettings.inactiveButtonClass
  );
};

export { enableValidation, clearValidation };
