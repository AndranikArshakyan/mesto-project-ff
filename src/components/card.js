import { setLike, deleteLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const isLiked = (card, userInfo) => {
  return card.likes.some((item) => {
    return item._id === userInfo._id;
  });
};

const toggleLike = (evt, cardId, cardLikeButton) => {
  const likeMethod = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : setLike;
  likeMethod(cardId)
    .then((res) => {
      evt.target
        .closest(".card")
        .querySelector(".card__like-count").textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCard = (
  item,
  handleImageZoom,
  toggleLike,
  openModal,
  onDeleteCard,
  userInfo
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

  if (isLiked(item, userInfo)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", (evt) => {
    toggleLike(evt, item._id, cardLikeButton);
  });
  cardImage.addEventListener("click", () => handleImageZoom(item));

  if (item.owner._id !== userInfo._id) {
    cardDeleteButton.remove();
  }
  return cardElement;
};

export { createCard, toggleLike };
