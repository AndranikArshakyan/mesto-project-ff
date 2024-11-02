import { apiSetLike, apiDeleteLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const isLiked = (card, profilePromiseRepsonse) => {
  return card.likes.some((item) => {
    return item._id === profilePromiseRepsonse._id;
  });
};

const setLike = (evt, cardId) => {
  apiSetLike(cardId)
    .then((res) => {
      evt.target
        .closest(".card")
        .querySelector(".card__like-count").textContent = res.likes.length;
      evt.target.classList.add("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLike = (evt, cardId) => {
  apiDeleteLike(cardId)
    .then((res) => {
      evt.target
        .closest(".card")
        .querySelector(".card__like-count").textContent = res.likes.length;
      evt.target.classList.remove("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCard = (
  item,
  setLike,
  handleImageZoom,
  deleteLike,
  openModal,
  onDeleteCard
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesCounter = cardElement.querySelector(".card__like-count");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", `${item.name}`);
  cardTitle.textContent = item.name;
  cardLikesCounter.textContent = item.likes.length;

  cardDeleteButton.addEventListener("click", (evt, popup) => {
    openModal(popup);
    onDeleteCard(evt, item._id);
  });
  cardLikeButton.addEventListener("click", (evt) => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(evt, item._id);
    } else {
      setLike(evt, item._id);
    }
  });
  cardImage.addEventListener("click", () => handleImageZoom(item));

  return cardElement;
};

export { createCard, setLike, isLiked, deleteLike };
