import api from "./api.js";
import { renderLoading } from "./utils.js";
import { disabledButton } from "./validate.js";

// 1. Работа модальных окон
// Открытие и закрытие модального окна

const popupProfile = document.querySelector("#popup-profile");
const btnEdit = document.querySelector(".profile__edit-button");
const btnCloseProfile = popupProfile.querySelector(".popup__btn-close");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarPopup = document.querySelector("#popup-avatar");
const profileAvatarContainer = document.querySelector(
    ".profile__avatar-container"
);
const profileAvatarForm = document.querySelector("#popup-avatar__form");
const profileAvatarFormButton =
    profileAvatarForm.querySelector(".popup__btn-save");
const avatarInput = profileAvatarForm.querySelector("#popup__input-source");

const openPopup = (element) => {
    element.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
};

const closePopup = (element) => {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
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
const buttonForm = popupProfileForm.querySelector(".popup__btn-save");

// 3. Форма добавления карточки

const popupCards = document.querySelector("#popup-cards");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloseAddCard = popupCards.querySelector(".popup__btn-close");
const buttonSave = popupCards.querySelector(".popup__btn-save");

// Редактирование имени и информации о себе

async function handlerUserFormSubmit(evt) {
    try {
        evt.preventDefault();
        renderLoading(buttonForm, true);
        const name = nameInput.value;
        const about = aboutMyselfInput.value;
        const updateUser = await api.patchProfile({ name, about });
        profileName.textContent = updateUser.name;
        profileAboutMyself.textContent = updateUser.about;
        renderLoading(buttonForm, false);
        closePopup(popupProfile);
    } catch (e) {
        renderLoading(buttonForm, false);
        console.error(e);
    }
}

async function handlerAvatarFormSubmit(evt) {
    try {
        evt.preventDefault();
        renderLoading(profileAvatarFormButton, true);
        const avatar = avatarInput.value;
        const updateAvatar = await api.patchAvatar({ avatar });
        profileAvatar.setAttribute("src", updateAvatar.avatar);
        renderLoading(profileAvatarFormButton, false);
        closePopup(profileAvatarPopup);
    } catch (e) {
        renderLoading(profileAvatarFormButton, false);
        console.error(e);
    }
}

popupProfileForm.addEventListener("submit", handlerUserFormSubmit);
profileAvatarForm.addEventListener("submit", handlerAvatarFormSubmit);

btnAdd.addEventListener("click", () => {
    disabledButton("popup__btn-save_disabled", buttonSave, true);
    openPopup(popupCards);
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

profileAvatarContainer.addEventListener("click", () =>
    openPopup(profileAvatarPopup)
);
profileAvatarPopup.addEventListener("mousedown", (evt) => {
    if (evt.target === profileAvatarPopup) {
        closePopup(profileAvatarPopup);
    }
});

const buttonClosePopupAvatar =
    profileAvatarPopup.querySelector(".popup__btn-close");

buttonClosePopupAvatar.addEventListener("click", () =>
    closePopup(profileAvatarPopup)
);
// Закрытие модального окна по нажатию на кнопку Esc

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

const setUser = async (user) => {
    try {
        const { name, about, avatar } = user;

        profileName.textContent = name;
        profileAboutMyself.textContent = about;
        profileAvatar.setAttribute("src", avatar);
    } catch (e) {
        console.error(e);
    }
};

export { openPopup, closePopup, setUser };
