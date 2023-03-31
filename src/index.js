import './pages/index.css';

import { initialCards } from './modules/initial-cards.js';
import { Card } from './modules/Card.js';
import { FormValidator } from './modules/FormValidator.js';
import { openPopup } from "./utils/utils.js";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');

const imagePopup = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const cardSubmitAddForm = cardAddPopup.querySelector('.popup__form_type_add');
const profileSubmitInfoForm = profileEditPopup.querySelector('.popup__form_type_edit')
const cardAddNameInput = cardAddPopup.querySelector('.popup__input_add_name');
const cardAddImageInput = cardAddPopup.querySelector('.popup__input_add_image');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const nameInput = profileEditPopup.querySelector('.popup__input_profile_name');
const professionInput = profileEditPopup.querySelector('.popup__input_profile_profession');

const cardsContainer = document.querySelector('.elements__group'); 

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    document.removeEventListener('mousedown', closePopupClick);
};

function closePopupEscape(e) {
    if(e.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

function closePopupClick(event) {
    const popupVisible = document.querySelector('.popup_opened');
    if(event.target === popupVisible) {
        if(popupVisible) {
            closePopup(popupVisible);
        };
    };
};

function createCard(cardData) {
    return new Card(cardData, '.card-template', imagePopup, closePopupEscape, closePopupClick);
};

initialCards.forEach(cardData => {
    const newCard = createCard(cardData);
    renderCards(newCard.getCard());
});

function renderCards(card) {
    cardsContainer.prepend(card);
};

profileEditButton.addEventListener('click', function () {
    profileSubmitInfoForm.reset();
    nameInput.value = nameProfile.textContent; 
    professionInput.value = professionProfile.textContent;
    openPopup(profileEditPopup, closePopupEscape, closePopupClick);
}); 

profileSubmitInfoForm.addEventListener('submit', function (e) {
    nameProfile.textContent = nameInput.value;
    professionProfile.textContent = professionInput.value;
    profileSubmitInfoForm.reset();
    closePopup(profileEditPopup);
});

cardAddButton.addEventListener('click', function () {
    cardSubmitAddForm.reset();
    formValidators['add-form'].disableSubmitButton();

    openPopup(cardAddPopup, closePopupEscape, closePopupClick);
});

cardSubmitAddForm.addEventListener('submit', function (e) {
    const newCardData = {
        name: cardAddNameInput.value,
        link: cardAddImageInput.value,
    };
    const card = createCard(newCardData);
    renderCards(card.getCard());
    closePopup(cardAddPopup);
});

popupCloseButtons.forEach(item => {
    item.addEventListener('click', function () {
        const popup = item.closest('.popup');
        closePopup(popup);
    });
});
