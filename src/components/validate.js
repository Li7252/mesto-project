// Добавить класс с ошибкой
const showInputError = (
    formSelector,
    inputSelector,
    errorMessage,
    settings
) => {
    const errorElement = formSelector.querySelector(
        `.${inputSelector.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

// Убрать класс с ошибкой
const hideInputError = (formSelector, inputSelector, settings) => {
    const errorElement = formSelector.querySelector(
        `.${inputSelector.id}-error`
    );
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
};

// Проверка валидности полей
const checkInputValidity = (formSelector, inputSelector, settings) => {
    if (inputSelector.validity.patternMismatch) {
        inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    } else {
        inputSelector.setCustomValidity("");
    }
    if (!inputSelector.validity.valid) {
        showInputError(
            formSelector,
            inputSelector,
            inputSelector.validationMessage,
            settings
        );
    } else {
        hideInputError(formSelector, inputSelector, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    });
};

const disabledButton = (inactiveButtonClass, submitButtonSelector, isAdded) => {
    isAdded
        ? submitButtonSelector.classList.add(inactiveButtonClass)
        : submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.disabled = isAdded;
};

// Активация и деактивация кнопки
const toggleButtonState = (inputList, submitButtonSelector, settings) => {
    if (hasInvalidInput(inputList)) {
        disabledButton(
            settings.inactiveButtonClass,
            submitButtonSelector,
            true
        );
    } else {
        disabledButton(
            settings.inactiveButtonClass,
            submitButtonSelector,
            false
        );
    }
};

// Проверка данных при вводе
const setEventListeners = (formSelector, settings) => {
    const inputList = Array.from(
        formSelector.querySelectorAll(settings.inputSelector)
    );
    const submitButtonSelector = formSelector.querySelector(
        settings.submitButtonSelector
    );
    toggleButtonState(inputList, submitButtonSelector, settings);
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener("input", function () {
            checkInputValidity(formSelector, inputSelector, settings);
            toggleButtonState(inputList, submitButtonSelector, settings);
        });
    });
};

// Проверка данных при отправке
const enableValidation = (settings) => {
    const formList = Array.from(
        document.querySelectorAll(settings.formSelector)
    );
    formList.forEach((formSelector) => {
        formSelector.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formSelector, settings);
    });
};

export { enableValidation, disabledButton };
