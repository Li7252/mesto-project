// 1. Работа модальных окон
// Открытие и закрытие модального окна

const popupProfile = document.querySelector("#popup-profile");
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseProfile = popupProfile.querySelector(".popup__btn-close");

const fadeIn = (element, timeOut, display) => {
    element.style.opacity = 0;
    element.style.display = display || "flex";
    element.style.transition = `opacity ${timeOut}ms`;

    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = "none";
    }, timeout);
};

btnEdit.addEventListener("click", () => fadeIn(popupProfile, 300, "flex"));

btnCloseProfile.addEventListener("click", () => fadeOut(popupProfile, 300));

// Поля формы

const popupProfileForm = popupProfile.querySelector("#popup-profile__form");
const nameInput = document.querySelector('input[name="name"]');
const aboutMyselfInput = document.querySelector('input[name="about-myself"]');
const profileName = document.querySelector(".profile__name");
const profileAboutMyself = document.querySelector(".profile__about-myself");

// Редактирование имени и информации о себе

function profileFormSubmit(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let aboutMyself = aboutMyselfInput.value;
    nameInput.textContent = name;
    aboutMyselfInput.textContent = aboutMyself;
    profileName.textContent = name;
    profileAboutMyself.textContent = aboutMyself;
    fadeOut(popupProfile, 300);
}

popupProfileForm.addEventListener("submit", profileFormSubmit);

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
    fadeOut(popupImage, 300);
};

const renderCards = function (items) {
    elements.innerHTML = "";
    items.forEach(function (card, id) {
        elements.innerHTML += `
            <article class="element">
                <button onclick="btnDelete(${id})" type="button" class="element__delete"></button>
                <img src="${card.link}" alt="${card.name}" class="element__image">
                    <div class="element__text-container">
                        <h2 class="element__title">${card.name}</h2>
                        <button type="button" class="element__like"></button>
                    </div>
            </article>`;
    });

    const elementImage = document.querySelectorAll(".element__image");

    elementImage.forEach((item, id) => {
        item.addEventListener("click", function () {
            const source = this.getAttribute("src");
            const title = this.getAttribute("alt");
            const popup = document.querySelector("#popup-image");

            popup.innerHTML = `
                        <div class="popup__image">
                            <button onclick="fadeOut(popupImage, 300)" type="button" class="popup__btn-close"></button>
                            <img src="${source}" alt="${title}" class="popup__image-item">
                            <p class="popup__image-title">${title}</p>
                        </div>
                    `;
            fadeIn(popupImage, 300, "flex");
            popupImage.classList.add("popup_opened-image");
        });
    });

    const btnLike = document.querySelectorAll(".element__like");

    btnLike.forEach((item) =>
        item.addEventListener("click", function () {
            item.classList.toggle("element__like_active");
        })
    );
};

renderCards(initialCards);

// 3. Форма добавления карточки

const popupCards = document.querySelector("#popup-cards");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloseAddCard = popupCards.querySelector(".popup__btn-close");

btnAdd.addEventListener("click", () => fadeIn(popupCards, 300, "flex"));

btnCloseAddCard.addEventListener("click", () => fadeOut(popupCards, 300));

// 4. Добавление карточки

const popupCardsForm = popupCards.querySelector("#popup-cards__form");
const titleInput = document.querySelector('input[name="title"]');
const sourceInput = document.querySelector('input[name="source"]');

function cardsFormSubmit(evt) {
    evt.preventDefault();
    let title = titleInput.value;
    let source = sourceInput.value;
    initialCards.unshift({
        name: title,
        link: source,
    });
    renderCards(initialCards);
    titleInput.value = "";
    sourceInput.value = "";
    fadeOut(popupCards, 300);
}

popupCardsForm.addEventListener("submit", cardsFormSubmit);

// Удаление карточки

const btnDelete = (id) => {
    delete initialCards[id];
    renderCards(initialCards);
};
