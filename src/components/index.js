import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, setLike } from "./card";
import { openModal, closeModal, addCloseEventListeners } from "./modal";

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popup = document.querySelector(".popup");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileNewCardButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

const popupTypeForm = popupTypeEdit.querySelector(".popup__form");
const popupInputTypeName = popupTypeForm.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = popupTypeForm.querySelector(
  ".popup__input_type_description"
);

const popupNewCardForm = popupTypeCard.querySelector(".popup__form");
const popupInputCardName = popupNewCardForm.querySelector(
  ".popup__input_type_card-name"
);
const popupInputCardLink = popupNewCardForm.querySelector(
  ".popup__input_type_url"
);

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addCard = (renderCard) => {
  document.querySelector(".places__list").prepend(renderCard);
};

const renderInitialCards = (...initialCards) => {
  initialCards[0].forEach((item) => {
    addCard(createCard(deleteCard, item, setLike, handleImageZoom));
  });
};
renderInitialCards(initialCards);

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  addCloseEventListeners(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
});

profileNewCardButton.addEventListener("click", () => {
  openModal(popupTypeCard);
  addCloseEventListeners(popupTypeCard);
});

placesList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    openModal(popupTypeImage);
    addCloseEventListeners(popupTypeImage);
    console.log(evt.target);
    handleImageZoom(evt);
  }

  if (evt.target.classList.contains("card__like-button")) {
    setLike(evt);
  }
});

const handleformSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupTypeEdit);
};
popupTypeForm.addEventListener("submit", handleformSubmit);

popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(
    createCard(
      deleteCard,
      {
        name: popupInputCardName.value,
        link: popupInputCardLink.value,
      },
      setLike,
      handleImageZoom
    )
  );
  closeModal(popupTypeCard);
  popupInputCardName.value = "";
  popupInputCardLink.value = "";
});

const handleImageZoom = (evt) => {
  const cardDescription =
    evt.target.parentElement.querySelector(".card__description");
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = cardDescription.textContent;
};
