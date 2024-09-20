// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const deleteCard = (evt)=> evt.target.parentElement.remove();

const renderCard = (deleteCard, ...initialCards) => {
  const cardTemplate = document.querySelector("#card-template").content;

  initialCards[0].forEach(item => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.setAttribute("src", item.link);
    cardTitle.textContent = item.name;

    document.querySelector(".places__list").append(cardElement);
    cardDeleteButton.addEventListener("click", deleteCard);
  });
};
renderCard(deleteCard, initialCards);