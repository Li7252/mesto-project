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

btnEdit.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutMyselfInput.value = profileAboutMyself.textContent;
    openPopup(popupProfile);
});

btnCloseProfile.addEventListener("click", () => closePopup(popupProfile));

// Поля формы

const popupProfileForm = popupProfile.querySelector("#popup-profile__form");
const nameInput = document.querySelector('input[name="name"]');
const aboutMyselfInput = document.querySelector('input[name="about-myself"]');
const profileName = document.querySelector(".profile__name");
const profileAboutMyself = document.querySelector(".profile__about-myself");

// Редактирование имени и информации о себе

function handlerFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const aboutMyself = aboutMyselfInput.value;
    profileName.textContent = name;
    profileAboutMyself.textContent = aboutMyself;
    closePopup(popupProfile);
}

popupProfileForm.addEventListener("submit", handlerFormSubmit);

// 3. Форма добавления карточки

const popupCards = document.querySelector("#popup-cards");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloseAddCard = popupCards.querySelector(".popup__btn-close");

btnAdd.addEventListener("click", () => openPopup(popupCards));

btnCloseAddCard.addEventListener("click", () => closePopup(popupCards));

// Закрытие модального окна по клику на overlay

popupProfile.addEventListener("click", (evt) => {
    if (evt.target === popupProfile) {
        closePopup(popupProfile);
    }
});

popupCards.addEventListener("click", (evt) => {
    if (evt.target === popupCards) {
        closePopup(popupCards);
    }
});

const popupImage = document.querySelector("#popup-image");
popupImage.addEventListener("click", (evt) => {
    if (evt.target === popupImage) {
        closePopup(popupImage);
    }
});

// Закрытие модального окна по нажатию на кнопку Esc
document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        closePopup(popupProfile);
        closePopup(popupCards);
        closePopup(popupImage);
    }
});

export { openPopup, closePopup };
