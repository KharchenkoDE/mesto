import './index.css';

import { initialCards, validationConfig, cardSelectors, userInfoSelectors } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const nameInput = profileEditPopup.querySelector('.popup__input_profile_name');
const professionInput = profileEditPopup.querySelector('.popup__input_profile_profession');

const userInfo = new UserInfo({
    nameSelector: userInfoSelectors.userNameSelector,
    dataSelector: userInfoSelectors.userDataSelector,
}); 

const cardsSection = new Section(
    {
        renderer: (item) => {
            cardsSection.addItem(createCard(item));
        }
    },
    cardSelectors.containerSelector
);

const popupImage = new PopupWithImage('.popup_type_image');

const userInfoPopup = new PopupWithForm({ popupSelector: '.popup_type_edit', submitFunction: (data) => {
    userInfo.setUserInfo(data);
    userInfoPopup.close();
}
});

const newCardPopup = new PopupWithForm({ popupSelector: '.popup_type_add', submitFunction: (data) => {
    cardsSection.addItem(createCard({
        name: data['add-name'],
        link: data['add-image']
    }, cardSelectors.cardSelectors));
    newCardPopup.close();
} 
});

cardsSection.renderItems(initialCards);
popupImage.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

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

function createCard(cardData){
    return new Card({ 
        cardData, 
        handleCardClick: () => {
            popupImage.open(cardData);
        } 
    }, '.card-template').getCard();
};

profileEditButton.addEventListener('click', function () {
    formValidators['profile-form'].disableSubmitButton();
    const myUserInfo = userInfo.getUserInfo();
    nameInput.value = myUserInfo.userName;
    professionInput.value = myUserInfo.userData;
    userInfoPopup.open();
}); 

cardAddButton.addEventListener('click', function () {
    formValidators['add-form'].disableSubmitButton();
    newCardPopup.open();
});