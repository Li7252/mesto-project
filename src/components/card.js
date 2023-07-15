import { openPopup, closePopup } from "./modal.js";
import api from "./api.js";
import {renderLoading} from './utils.js'

// 2. Шесть карточек "из коробки"

const elements = document.querySelector(".elements");

const popupImage = document.querySelector("#popup-image");

const btnCloseImage = popupImage.querySelector(".popup__btn-close");

btnCloseImage.addEventListener("click", () => closePopup(popupImage));

// Удаление карточки

const deleteButton = async (element, card) => {
    try {
        await api.deleteCard(card._id);
        element.remove();
    } catch (e) {
        console.error(e);
    }
};

const template = document.querySelector("#card").content;
const popup = document.querySelector("#popup-image");
const popupImageTitle = document.querySelector(".popup__image-title");
const buttonSubmit = document.querySelector(".popup__btn-save");
const imageCard = popup.querySelector("img");

const renderCards = function (element, deleteble = false) {
    const { link, name } = element;

    const card = template.querySelector(".element").cloneNode(true);

    card.querySelector(".element__image").src = link;
    card.querySelector(".element__image").alt = name;
    card.querySelector(".element__title").textContent = name;
    card.querySelector(".element__like-count").textContent =
        element.likes?.length;

    const ownerId = element.owner._id;

    element.likes.forEach((item) => {
        if (item._id === ownerId) {
            card.querySelector(".element__like").classList.add(
                "element__like_active"
            );
        }
    });

    if (deleteble) {
        card.querySelector(".element__delete").addEventListener("click", () =>
            deleteButton(card, element)
        );
    } else {
        card.querySelector(".element__delete").remove();
    }
    card.querySelector(".element__image").addEventListener(
        "click",
        async function () {
            imageCard.src = link;
            imageCard.alt = name;
            popupImageTitle.textContent = name;
            openPopup(popupImage);
        }
    );
    card.querySelector(".element__like").addEventListener(
        "click",
        async function () {
            try {
                if (!this.classList.contains("element__like_active")) {
                    const addLike = await api.putLike(element._id);
                    card.querySelector(".element__like-count").textContent =
                        addLike.likes.length;
                    this.classList.add("element__like_active");
                } else {
                    const addLike = await api.deleteLike(element._id);
                    card.querySelector(".element__like-count").textContent =
                        addLike.likes.length;
                    this.classList.remove("element__like_active");
                }
            } catch (e) {
                console.error(e);
            }
        }
    );

    return card;
};

const cardsInit = async (userId, cards) => {
    try {
        cards.forEach((item) => {
            elements.append(renderCards(item, item.owner._id === userId));
        });
    } catch (e) {
        console.error(e);
    }
};

// 4. Добавление карточки
const popupCards = document.querySelector("#popup-cards");
const popupCardsForm = popupCards.querySelector("#popup-cards__form");
const titleInput = document.querySelector('input[name="title"]');
const sourceInput = document.querySelector('input[name="source"]');
const buttonForm = popupCardsForm.querySelector(".popup__btn-save");

async function cardsFormSubmit(evt) {
    try {
        renderLoading(buttonForm, true)
        evt.preventDefault();
        const name = titleInput.value;
        const link = sourceInput.value;
        const addedCard = await api.postCard({ name, link });
        elements.prepend(renderCards(addedCard, true));
        evt.target.reset();
        renderLoading(buttonForm, false)
        closePopup(popupCards);
    } catch (e) {
        renderLoading(buttonForm, false)
        console.log(e);
    }
}

popupCardsForm.addEventListener("submit", cardsFormSubmit);

function keyHandler(evt) {
    if (evt.key === "Enter" && !buttonSubmit.hasAttribute("disabled")) {
        cardsFormSubmit(evt);
    }
}

export { cardsInit, cardsFormSubmit };
