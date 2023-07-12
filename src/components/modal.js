// 1. Работа модальных окон
// Открытие и закрытие модального окна

const popupProfile = document.querySelector("#popup-profile");
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseProfile = popupProfile.querySelector(".popup__btn-close");

const openPopup = (element) => {
    element.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape); 
};

const closePopup = (element) => {
    element.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscape);
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
const buttonSave = popupCards.querySelector(".popup__btn-save");

btnAdd.addEventListener("click", () => {
    openPopup(popupCards);
    buttonSave.classList.add("popup__btn-save_disabled");
    buttonSave.disabled = true;
});

btnCloseAddCard.addEventListener("click", () => closePopup(popupCards));

// Закрытие модального окна по клику на overlay

popupProfile.addEventListener("mousedown", (evt) => {
    if (evt.target === popupProfile) {
        closePopup(popupProfile);
    }
});

popupCards.addEventListener("mousedown", (evt) => {
    if (evt.target === popupCards) {
        closePopup(popupCards);
    }
});

const popupImage = document.querySelector("#popup-image");
popupImage.addEventListener("mousedown", (evt) => {
    if (evt.target === popupImage) {
        closePopup(popupImage);
    }
});

// Закрытие модального окна по нажатию на кнопку Esc

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    }
  }

export { openPopup, closePopup };
