const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keyup", handleEscKeyUp);
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
};

const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

const addCloseEventListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
};

export { openModal, closeModal, addCloseEventListeners };
