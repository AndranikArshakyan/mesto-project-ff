import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, setLike } from "./card";
import { openModal, closeModal, addCloseEventListeners } from "./modal";

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileNewCardButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

const popupEditProfileForm = popupTypeEdit.querySelector(".popup__form");
const popupInputTypeName = popupEditProfileForm.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = popupEditProfileForm.querySelector(
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
  placesList.prepend(renderCard);
};

const handleImageZoom = (item) => {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openModal(popupTypeImage);
};

const renderInitialCards = (initialCards) => {
  initialCards.forEach((item) => {
    addCard(createCard(deleteCard, item, setLike, handleImageZoom));
  });
};
renderInitialCards(initialCards);

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
});

profileNewCardButton.addEventListener("click", () => {
  openModal(popupTypeCard);
});

addCloseEventListeners(popupTypeCard);
addCloseEventListeners(popupTypeImage);
addCloseEventListeners(popupTypeEdit);

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupTypeEdit);
};
popupEditProfileForm.addEventListener("submit", handleProfileFormSubmit);

const handleCardFormSubmit = (evt) => {
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
  popupNewCardForm.reset();
};
popupNewCardForm.addEventListener("submit", handleCardFormSubmit);
