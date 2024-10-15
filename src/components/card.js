const cardTemplate = document.querySelector("#card-template").content;

const deleteCard = (evt) => evt.target.closest(".card").remove()

const setLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const createCard = (deleteCard, item, setLike, handleImageZoom) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", `${item.name}`);
  cardTitle.textContent = item.name;

  cardDeleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", setLike);
  cardImage.addEventListener("click", ()=> handleImageZoom(item));
  
  return cardElement;
};

export { createCard, deleteCard, setLike };
