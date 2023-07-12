import "../src/pages/index.css";
import { cardsInit } from "../src/components/card.js";
import { enableValidation } from "./components/validate.js";

cardsInit();
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    errorClass: 'popup__input-error_active'
  });
