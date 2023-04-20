export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

export const cardSelectors = {
  containerSelector: '.elements__group',
  elementSelector: '.card-template'
};

export const userInfoSelectors = {
  userNameSelector: '.profile__name',
  userDataSelector: '.profile__profession'
};

export const popupSelectors = {
  userInfoPopup: '.popup_type_edit',
  // popupEditAvatar: '.popup_type_avatar-edit',
  newCardPopup: '.popup_type_add',
  popupImage: '.popup_type_image',
  popupDeleteCard: '.popup_type_delete'
}
