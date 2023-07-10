// Добавить класс с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(
        `.${inputSelector.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};

// Убрать класс с ошибкой
const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(
        `.${inputSelector.id}-error`
    );
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
};

// Проверка валидности полей
const checkInputValidity = (formSelector, inputSelector) => {
    if (inputSelector.validity.patternMismatch) {
        inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    } else {
        inputSelector.setCustomValidity("");
    }
    if (!inputSelector.validity.valid) {
        showInputError(
            formSelector,
            inputSelector,
            inputSelector.validationMessage
        );
    } else {
        hideInputError(formSelector, inputSelector);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    });
};

// Активация и деактивация кнопки
const toggleButtonState = (inputList, submitButtonSelector) => {
    if (hasInvalidInput(inputList)) {
        submitButtonSelector.classList.add("popup__btn-save_disabled");
        submitButtonSelector.disabled = true;
    } else {
        submitButtonSelector.classList.remove("popup__btn-save_disabled");
        submitButtonSelector.disabled = false;
    }
};

// Проверка данных при вводе
const setEventListeners = (formSelector) => {
    const inputList = Array.from(
        formSelector.querySelectorAll(".popup__input")
    );
    const submitButtonSelector = formSelector.querySelector(".popup__btn-save");
    toggleButtonState(inputList, submitButtonSelector);
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener("input", function () {
            checkInputValidity(formSelector, inputSelector);
            toggleButtonState(inputList, submitButtonSelector);
        });
    });
};

// Проверка данных при отправке
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formSelector) => {
        formSelector.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formSelector);
    });
};

export { enableValidation };
