import './index.css';

import { validationConfig, cardSelectors, userInfoSelectors, popupSelectors } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { api } from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
let userId = '';

const userInfo = new UserInfo({
    nameSelector: userInfoSelectors.userNameSelector,
    dataSelector: userInfoSelectors.userDataSelector,
    avatarSelector: userInfoSelectors.userAvatarSelector
}); 

const cardsSection = new Section(
    {
        renderer: (item) => {
            cardsSection.addItem(createCard(item));
        }
    },
    cardSelectors.containerSelector
);

const popupImage = new PopupWithImage(popupSelectors.popupImage);

const userInfoPopup = new PopupWithForm({ 
    popupSelector: popupSelectors.userInfoPopup, 
    submitFunction: (data) => {
        api.setUserInfo({
            name: data.userName,
            about: data.userData
        })
        .then((data) => {
            userInfo.setUserInfo({
                userName: data.name,
                userData: data.about,
            });
            userInfoPopup.close();
        })
    }
});

const newCardPopup = new PopupWithForm({ 
    popupSelector: popupSelectors.newCardPopup, 
    submitFunction: (data) => {
        api.postNewCard({
            name: data['add-name'],
            link: data['add-image']
        })
        .then((data) => {
            cardsSection.addItem(createCard(data));
            newCardPopup.close();
        })
} 
});

const popupDeleteNewCard = new PopupWithSubmit(popupSelectors.popupDeleteCard) 

popupImage.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
popupDeleteNewCard.setEventListeners();

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
        },
        handleDeleteClick: (card) => {
            popupDeleteNewCard.open();
            popupDeleteNewCard.setHandleDeleteClick(() => {
                api.deleteCard(card.getCardId())
                .then(() => {
                    card.deleteCard();
                    popupDeleteNewCard.close();
                })
            })
        },
        handleLikeClick: (card) => {
            api.changeLike(card.getCardId(), card.isLiked())
            .then(data => {
                card.addLike(data);
            })
        },
        userId
    }, '.card-template').getCard();
};

profileEditButton.addEventListener('click', function () {
    formValidators['profile-form'].disableSubmitButton();
    const myUserInfo = userInfo.getUserInfo();
    userInfoPopup.setInputValues({
        userName: myUserInfo.userName,
        userData: myUserInfo.userData
    });
    userInfoPopup.open();
}); 

cardAddButton.addEventListener('click', function () {
    formValidators['add-form'].disableSubmitButton();
    newCardPopup.open();
});

api.getStartAppData()
  .then(([ userData, initialCards ]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      userName: userData.name,
      userData: userData.about,
      userAvatar: userData.avatar
    });
    cardsSection.renderItems(initialCards.reverse());
  })
  .catch(err =>
    console.log(`Ошибка загрузки данных: ${err}`)
)