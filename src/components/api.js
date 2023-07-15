const config = {
    headers: {
        authorization: "79a3cc37-2bb9-4b81-a9ac-2c39f1e2101a",
        "Content-Type": "application/json",
    },
};

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
} 

const api = {
    async getUser() {
        return fetch(
            "https://nomoreparties.co/v1/plus-cohort-26/users/me",
            config
        ).then((res) => getResponseData(res));
    },

    async getCards() {
        return fetch(
            "https://nomoreparties.co/v1/plus-cohort-26/cards",
            config
        ).then((res) => getResponseData(res));
    },

    async patchProfile(data) {
        return fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me", {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify(data),
        }).then((res) => getResponseData(res));
    },
    async postCard(data) {
        return fetch("https://nomoreparties.co/v1/plus-cohort-26/cards", {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify(data),
        }).then((res) => getResponseData(res));
    },

    async deleteCard(cardId) {
        return fetch(
            `https://nomoreparties.co/v1/plus-cohort-26/cards/${cardId}`,
            {
                method: "DELETE",
                headers: config.headers,
            }
        ).then((res) => getResponseData(res));
    },

    async putLike(cardId) {
        return fetch(
            `https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`,
            {
                method: "PUT",
                headers: config.headers,
            }
        ).then((res) => getResponseData(res));
    },

    async deleteLike(cardId) {
        return fetch(
            `https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`,
            {
                method: "DELETE",
                headers: config.headers,
            }
        ).then((res) => getResponseData(res));
    },

    async patchAvatar(data) {
        return fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me/avatar", {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify(data),
        }).then((res) => getResponseData(res));
    }
};

export { api as default };
