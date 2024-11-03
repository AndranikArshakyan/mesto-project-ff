import "../pages/index.css";
import { createCard, toggleLike } from "./card";
import { openModal, closeModal, addCloseEventListeners } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  updateUserImage,
  deleteCard,
} from "./api";

// Элементы формы редактирования данных пользователя
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupEditProfileForm = popupTypeEdit.querySelector(".popup__form");
const popupInputTypeName = popupEditProfileForm.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = popupEditProfileForm.querySelector(
  ".popup__input_type_description"
);
const popupSaveProfileButton = popupTypeEdit.querySelector(".popup__button");
const profileEditButton = document.querySelector(".profile__edit-button");

// Элементы формы добавления карточки
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = popupTypeCard.querySelector(".popup__form");
const popupInputCardName = popupNewCardForm.querySelector(
  ".popup__input_type_card-name"
);
const popupInputCardLink = popupNewCardForm.querySelector(
  ".popup__input_type_url"
);
const popupAddCardButton = popupTypeCard.querySelector(".popup__button");
const profileNewCardButton = document.querySelector(".profile__add-button");

// Элементы формы увеличенной картинки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// Элементы формы редактирования аватара
const popupTypeProfileImage = document.querySelector(
  ".popup_type_edit-profile-image"
);
const popupEditProfileImageForm =
  popupTypeProfileImage.querySelector(".popup__form");
const popupSaveProfileImageButton =
  popupEditProfileImageForm.querySelector(".popup__button");
const popupInputProfileImage = popupEditProfileImageForm.querySelector(
  ".popup__input_type_url"
);

// Элементы формы удаления карточки
const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
const popupDeleteCardForm = popupTypeDeleteCard.querySelector(".popup__form");
const popupDeleteCardButton =
  popupDeleteCardForm.querySelector(".popup__button");

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const preloader = document.querySelector(".preloader");
const spinner = document.querySelector(".spinner");
const spinnerContent = spinner.querySelector(".spinner-content");
const spinnerError = spinner.querySelector(".spinner-content__error");
const spinnerCircle = spinner.querySelector(".spinner-circle");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  inactiveButtonClass: "popup__button_disabled",
};

let cardForDelete = {};

const addCard = (renderCard) => {
  placesList.prepend(renderCard);
};

const handleImageZoom = (item) => {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openModal(popupTypeImage);
};

const renderLoading = (
  isLoading,
  preloader,
  spinnerCircle,
  spinner,
  spinnerContent
) => {
  if (isLoading) {
    preloader.classList.add("preloader_visible");
    spinnerCircle.classList.add("preloader_visible");
    spinner.classList.add("spinner_visible");
    spinnerContent.classList.add("spinner-content_hidden");
  } else {
    preloader.classList.remove("preloader_visible");
    spinnerCircle.classList.remove("preloader_visible");
    spinner.classList.remove("spinner_visible");
    spinnerContent.classList.remove("spinner-content_hidden");
  }
};

const renderError = (
  err,
  preloader,
  spinnerCircle,
  spinnerError,
  spinnerContent
) => {
  preloader.classList.add("preloader_visible");
  spinnerCircle.classList.add("spinner-circle_hidden");
  spinnerError.textContent = err;
  spinnerContent.classList.add("spinner-content_visible");
};

const renderInitialCards = (cardsPromiseResponse, profilePromiseRepsonse) => {
  cardsPromiseResponse.forEach((card) => {
    const cardElement = createCard(
      card,
      handleImageZoom,
      (evt) =>
        toggleLike(
          evt,
          card._id,
          cardElement.querySelector(".card__like-button")
        ),
      () => openModal(popupTypeDeleteCard),
      (evt) => onDeleteCard(evt, card._id),
      profilePromiseRepsonse
    );
    addCard(cardElement);
  });
};

const renderProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

const loadInitialData = () => {
  renderLoading(true, preloader, spinnerCircle, spinner, spinnerContent);
  const promisesArray = [getUserInfo(), getInitialCards()];
  Promise.all(promisesArray)
    .then(([userInfo, cards]) => {
      renderProfileInfo(userInfo);
      renderInitialCards(cards, userInfo);
      renderLoading(false, preloader, spinnerCircle, spinner, spinnerContent);
    })
    .catch((err) => {
      renderError(
        `${err}`,
        preloader,
        spinnerCircle,
        spinnerError,
        spinnerContent
      );
    });
};
loadInitialData();

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  clearValidation(popupEditProfileForm, validationConfig);
  popupSaveProfileButton.textContent = "Сохранить";
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
});

profileNewCardButton.addEventListener("click", () => {
  openModal(popupTypeCard);
  clearValidation(popupNewCardForm, validationConfig);
  popupAddCardButton.textContent = "Сохранить";
});

profileImage.addEventListener("click", () => {
  openModal(popupTypeProfileImage);
  clearValidation(popupEditProfileImageForm, validationConfig);
  popupSaveProfileImageButton.textContent = "Сохранить";
});

addCloseEventListeners(popupTypeCard);
addCloseEventListeners(popupTypeImage);
addCloseEventListeners(popupTypeEdit);
addCloseEventListeners(popupTypeProfileImage);
addCloseEventListeners(popupTypeDeleteCard);

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  popupSaveProfileButton.textContent = "Сохранение...";
  updateUserInfo(popupInputTypeName.value, popupInputTypeDescription.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      popupSaveProfileButton.textContent = `${err}`;
    });
};
popupEditProfileForm.addEventListener("submit", handleProfileFormSubmit);

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  popupAddCardButton.textContent = "Сохранение...";
  addNewCard(popupInputCardName.value, popupInputCardLink.value)
    .then((res) => {
      const cardElement = createCard(
        res,
        handleImageZoom,
        (evt) =>
          toggleLike(
            evt,
            res._id,
            cardElement.querySelector(".card__like-button")
          ),
        () => openModal(popupTypeDeleteCard),
        (evt) => onDeleteCard(evt, res._id),
        res.owner
      );
      addCard(cardElement);
      closeModal(popupTypeCard);
      popupNewCardForm.reset();
    })
    .catch((err) => {
      popupAddCardButton.textContent = `${err}`;
      console.log(err);
    });
};
popupNewCardForm.addEventListener("submit", handleCardFormSubmit);

const handleProfileImageFormSubmit = (evt) => {
  evt.preventDefault();
  popupSaveProfileImageButton.textContent = "Сохранение...";
  updateUserImage(popupInputProfileImage.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupTypeProfileImage);
    })
    .catch((err) => {
      popupSaveProfileImageButton.textContent = `${err}`;
    });
};
popupEditProfileImageForm.addEventListener(
  "submit",
  handleProfileImageFormSubmit
);

const onDeleteCard = (evt, cardId) => {
  cardForDelete = {
    evt: evt,
    cardId: cardId,
  };
};

const handleCardDelete = () => {
  popupDeleteCardButton.textContent = "Удаление...";
  deleteCard(cardForDelete.cardId)
    .then(() => {
      cardForDelete.evt.target.closest(".card").remove();
      closeModal(popupTypeDeleteCard);
      popupDeleteCardButton.textContent = "Да";
    })
    .catch((err) => {
      popupDeleteCardButton.textContent = `${err}`;
    });
};
popupDeleteCardButton.addEventListener("click", handleCardDelete);

enableValidation(validationConfig);
