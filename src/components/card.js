const cardTemplate = document.querySelector("#card-template").content;

const deleteCard = (evt) => evt.target.parentElement.remove();

const setLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const createCard = (deleteCard, item, setLike, handleImageZoom) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", "Изображение природы");
  cardTitle.textContent = item.name;

  cardDeleteButton.addEventListener("click", deleteCard);
  return cardElement;
};

export { createCard, deleteCard, setLike };
