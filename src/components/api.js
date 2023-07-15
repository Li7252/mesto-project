const config = {
    headers: {
        authorization: "79a3cc37-2bb9-4b81-a9ac-2c39f1e2101a",
        "Content-Type": "application/json",
    },
};

const api = {
    async getUser() {
        return fetch(
            "https://nomoreparties.co/v1/plus-cohort-26/users/me",
            config
        ).then((res) => res.json());
    },

    async getCards() {
        return fetch(
            "https://nomoreparties.co/v1/plus-cohort-26/cards",
            config
        ).then((res) => res.json());
    },

    async patchProfile(data) {
        return fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me", {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify(data),
        }).then((res) => res.json());
    },
    async postCard(data) {
        return fetch("https://nomoreparties.co/v1/plus-cohort-26/cards", {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify(data),
        }).then((res) => res.json());
    },

    async deleteCard(cardId) {
        return fetch(
            `https://nomoreparties.co/v1/plus-cohort-26/cards/${cardId}`,
            {
                method: "DELETE",
                headers: config.headers,
            }
        ).then((res) => res.json());
    },

    async putLike(cardId) {
        return fetch(
            `https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`,
            {
                method: "PUT",
                headers: config.headers,
            }
        ).then((res) => res.json());
    },

    async deleteLike(cardId) {
        return fetch(
            `https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`,
            {
                method: "DELETE",
                headers: config.headers,
            }
        ).then((res) => res.json());
    },

    async patchAvatar(data) {
        return fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me/avatar", {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }
};

export { api as default };
