// 1. Работа модальных окон
// Открытие и закрытие модального окна

const popupProfile = document.querySelector("#popup-profile");
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseProfile = popupProfile.querySelector(".popup__btn-close");

const openPopup = (element) => {
    element.classList.add("popup_opened");
};

const closePopup = (element) => {
    element.classList.remove("popup_opened");
};

btnEdit.addEventListener("click", () => openPopup(popupProfile));

btnCloseProfile.addEventListener("click", () => closePopup(popupProfile));

// Поля формы

const popupProfileForm = popupProfile.querySelector("#popup-profile__form");
const nameInput = document.querySelector('input[name="name"]');
const aboutMyselfInput = document.querySelector('input[name="about-myself"]');
const profileName = document.querySelector(".profile__name");
const profileAboutMyself = document.querySelector(".profile__about-myself");

nameInput.value = profileName.textContent;
aboutMyselfInput.value = profileAboutMyself.textContent;

// Редактирование имени и информации о себе

function handlerFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const aboutMyself = aboutMyselfInput.value;
    nameInput.textContent = name;
    aboutMyselfInput.textContent = aboutMyself;
    profileName.textContent = name;
    profileAboutMyself.textContent = aboutMyself;
    closePopup(popupProfile);
}

popupProfileForm.addEventListener("submit", handlerFormSubmit);

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

const btnCloseImage = () => {
    closePopup(popupImage);
};

// Удаление карточки

const deleteButton = (element) => {
  element.remove();
};

const renderCards = function (element) {
    const { link, name } = element;

    const template = document.querySelector("#card").content;
    const card = template.querySelector(".element").cloneNode(true);

    card.querySelector(".element__image").src = link;
    card.querySelector(".element__image").alt = name;
    card.querySelector(".element__title").alt = name;
    card.querySelector(".element__delete").addEventListener(
        "click",
        () => deleteButton(card)
    );
    card.querySelector(".element__image").addEventListener(
        "click",
        function () {
            const source = this.getAttribute("src");
            const title = this.getAttribute("alt");
            const popup = document.querySelector("#popup-image");
            popup.querySelector("img").src = source;
            popup.querySelector("img").title = title;
            openPopup(popupImage);
        }
    );
    card.querySelector(".element__like").addEventListener("click", function () {
        this.classList.toggle("element__like_active");
    });

    return card;
};

initialCards.forEach((item) => {
    elements.append(renderCards(item));
});

// 3. Форма добавления карточки

const popupCards = document.querySelector("#popup-cards");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloseAddCard = popupCards.querySelector(".popup__btn-close");

btnAdd.addEventListener("click", () => openPopup(popupCards));

btnCloseAddCard.addEventListener("click", () => closePopup(popupCards));

// 4. Добавление карточки

const popupCardsForm = popupCards.querySelector("#popup-cards__form");
const titleInput = document.querySelector('input[name="title"]');
const sourceInput = document.querySelector('input[name="source"]');

function cardsFormSubmit(evt) {
    evt.preventDefault();
    const name = titleInput.value;
    const link = sourceInput.value;
    elements.prepend(renderCards({name, link}));
    titleInput.value = "";
    sourceInput.value = "";
    closePopup(popupCards);
}

popupCardsForm.addEventListener("submit", cardsFormSubmit);
