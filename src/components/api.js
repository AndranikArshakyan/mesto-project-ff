const fetchConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-26",
  headers: {
    authorization: "ffb13434-2cfb-4f03-8a95-0559a6450320",
    "Content-Type": "application/json",
  },
};

const dataResolver = (data) => {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject(`Ошибка: ${data.status}`);
};

const getUserInfo = () => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    headers: fetchConfig.headers,
  }).then((res) => {
    return dataResolver(res);
  });
};

const getInitialCards = () => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    headers: fetchConfig.headers,
  }).then((res) => {
    return dataResolver(res);
  });
};

const updateUserInfo = (profileName, profileDescription) => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  }).then((res) => {
    return dataResolver(res);
  });
};

const updateUserImage = (profileImage) => {
  return fetch(`${fetchConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      avatar: profileImage,
    }),
  }).then((res) => {
    return dataResolver(res);
  });
};

const addNewCard = (cardName, cardLink) => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    method: "POST",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    return dataResolver(res);
  });
};

const deleteCard = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: fetchConfig.headers,
  }).then((res) => {
    return dataResolver(res);
  });
};

const setLike = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: fetchConfig.headers,
  }).then((res) => {
    return dataResolver(res);
  });
};

const deleteLike = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: fetchConfig.headers,
  }).then((res) => {
    return dataResolver(res);
  });
};

export {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteCard,
  setLike as apiSetLike,
  deleteLike as apiDeleteLike,
  updateUserImage,
};
