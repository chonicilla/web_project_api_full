const TOKEN_KEY = "jwt";
const DEFAULT_API_URL = "http://localhost:3000";
const API_URL = `${(import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(
  /\/$/,
  "",
)}/`;

class Api {
  constructor(options) {
    this._options = options;
  }

  _request(endpoint, method = "GET", body = undefined) {
    const apiOptions = {
      method,
      headers: {
        authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    if (body !== undefined && method !== "GET") {
      apiOptions.body = JSON.stringify(body);
      apiOptions.headers["content-type"] = "application/json";
    }

    return fetch(`${this._options.apiUrl}${endpoint}`, apiOptions).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      },
    );
  }

  getInitialCards() {
    return this._request("cards");
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, "DELETE");
  }

  setUserInformation(name, about) {
    const data = { name, about };
    const method = "PATCH";

    return this._request("users/me", method, data);
  }

  setUserInfo(data) {
    const { name, about } = data;
    return this.setUserInformation(name, about);
  }

  getUserInformation() {
    return this._request("users/me");
  }

  getUserInfo() {
    return this.getUserInformation();
  }

  toggleLike(method, cardId) {
    return this._request(`cards/${cardId}/likes`, method);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return this.toggleLike(method, cardId);
  }

  addCard(name, link) {
    const data = { name, link };
    const method = "POST";

    return this._request("cards", method, data);
  }

  getAppData() {
    return Promise.all([this.getUserInformation(), this.getInitialCards()]);
  }

  updateUserImage(avatar) {
    const data = { avatar };
    const method = "PATCH";

    return this._request("users/me/avatar", method, data);
  }

  setUserAvatar(data) {
    const { avatar } = data;
    return this.updateUserImage(avatar);
  }

  getCardList() {
    return this.getInitialCards();
  }
}

const api = new Api({
  apiUrl: API_URL,
});

export default api;
