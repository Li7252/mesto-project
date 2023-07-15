import "./index.css";
import { cardsInit } from "../components/card.js";
import { enableValidation } from "../components/validate.js";
import { setUser } from "../components/modal";
import api from "../components/api";

Promise.all([api.getUser(), api.getCards()])
    .then((values) => {
        const user = values[0];
        const cards = values[1];
        setUser(user);
        cardsInit(user._id, cards);
    })
    .catch((err) => {
        console.error(err);
    });
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-save",
    inactiveButtonClass: "popup__btn-save_disabled",
    errorClass: "popup__input-error_active",
});
