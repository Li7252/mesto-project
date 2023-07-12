import { openPopup, closePopup } from "./modal.js";

// 2. Шесть карточек "из коробки"

const elements = document.querySelector(".elements");
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const popupImage = document.querySelector("#popup-image");
const btnCloseImage = popupImage.querySelector(".popup__btn-close");

btnCloseImage.addEventListener("click", () => closePopup(popupImage));

// Удаление карточки

const deleteButton = (element) => {
    element.remove();
};

const template = document.querySelector("#card").content;
const popup = document.querySelector("#popup-image");
const popupImageTitle = document.querySelector(".popup__image-title");
const buttonSubmit = document.querySelector(".popup__btn-save");
const imageCard = popup.querySelector('img');

const renderCards = function (element) {
    const { link, name } = element;

    const card = template.querySelector(".element").cloneNode(true);

    card.querySelector(".element__image").src = link;
    card.querySelector(".element__image").alt = name;
    card.querySelector(".element__title").textContent = name;
    card.querySelector(".element__delete").addEventListener("click", () =>
        deleteButton(card)
    );
    card.querySelector(".element__image").addEventListener(
        "click",
        function () {
            imageCard.src = link;
            imageCard.alt = name;
            popupImageTitle.textContent = name;
            openPopup(popupImage);
        }
    );
    card.querySelector(".element__like").addEventListener("click", function () {
        this.classList.toggle("element__like_active");
    });

    return card;
};

const cardsInit = () => {
    initialCards.forEach((item) => {
        elements.append(renderCards(item));
    });
};

// 4. Добавление карточки
const popupCards = document.querySelector("#popup-cards");
const popupCardsForm = popupCards.querySelector("#popup-cards__form");
const titleInput = document.querySelector('input[name="title"]');
const sourceInput = document.querySelector('input[name="source"]');

function cardsFormSubmit(evt) {
    evt.preventDefault();
    const name = titleInput.value;
    const link = sourceInput.value;
    elements.prepend(renderCards({ name, link }));
    evt.target.reset()
    closePopup(popupCards);
}

popupCardsForm.addEventListener("submit", cardsFormSubmit);

function keyHandler(evt) {
    if (evt.key === "Enter" && !buttonSubmit.hasAttribute("disabled")) {
        cardsFormSubmit(evt);
    }
}

export { cardsInit, cardsFormSubmit };
