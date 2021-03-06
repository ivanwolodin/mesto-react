class Api {
    constructor(options) {
        this._url = options.url;
        this._token = options.token;
        this._headers = {
            authorization: this._token,
            'Content-Type': 'application/json'
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeUserInfo(name, profession) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
            .then(this._checkResponse)
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeAvatar(avatarLink) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-35',
    token: '3a99f107-1f3f-4594-b232-09564fbe9a82',
});
