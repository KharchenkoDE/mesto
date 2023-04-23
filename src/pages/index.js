import './index.css';

import { validationConfig, cardSelectors, userInfoSelectors, popupSelectors } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { Api } from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const userAvatar = document.querySelector('.profile__avatar-edit');
let userId = null;

const infoLoading = (popupSelector, loading) => {
    const activeButtoninfo = document.querySelector(`${popupSelector} .popup__submit-button`);
    if(loading) {
        activeButtoninfo.textContent = 'Сохранение...';
    } else {
        activeButtoninfo.textContent = 'Сохранить';
    }
};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
    headers: {
        authorization: '2e178716-522e-409b-aca6-9350655766ce',
        'Content-Type': 'application/json'
    }
});

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

const popupAvatar = new PopupWithForm({
    popupSelector: popupSelectors.popupAvatarEdit,
    submitFunction: (data) => {
        infoLoading(popupSelectors.popupAvatarEdit, true);
        api.setAvatar(data.userAvatar)
        .then((data) => {
            userInfo.setUserInfo({
                userName: data.name,
                userData: data.about,
                userAvatar: data.avatar
            });
            popupAvatar.close();
        })
        .catch(err => 
            console.log(`Ошибка изменения аватара пользователя: ${err}`))
            .finally(() => {
                infoLoading(popupSelectors.popupAvatarEdit, false)
            })
    }
});

const userInfoPopup = new PopupWithForm({ 
    popupSelector: popupSelectors.userInfoPopup, 
    submitFunction: (data) => {
        infoLoading(popupSelectors.userInfoPopup, true);
        api.setUserInfo({
            name: data.userName,
            about: data.userData
        })
        .then((data) => {
            userInfo.setUserInfo({
                userName: data.name,
                userData: data.about,
                userAvatar: data.avatar
            });
            userInfoPopup.close();
        })
        .catch(err => 
            console.log(`Ошибка загрузки информации о пользователе: ${err}`))
            .finally(() => {
                infoLoading(popupSelectors.userInfoPopup, false)
            })
    }
});

const newCardPopup = new PopupWithForm({ 
    popupSelector: popupSelectors.newCardPopup, 
    submitFunction: (data) => {
        infoLoading(popupSelectors.newCardPopup, true);
        api.postNewCard({
            name: data['add-name'],
            link: data['add-image']
        })
        .then((data) => {
            cardsSection.addItem(createCard(data));
            newCardPopup.close();
        })
        .catch(err => 
            console.log(`Ошибка загрузки новой карточки: ${err}`))
            .finally(() => {
                infoLoading(popupSelectors.newCardPopup, false)
            })
} 
});

const popupDeleteNewCard = new PopupWithSubmit(popupSelectors.popupDeleteCard) 

popupImage.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
popupAvatar.setEventListeners();
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
                .catch(err => 
                    console.log(`Ошибка удаления карточки: ${err}`))
            })
        },
        handleLikeClick: (card) => {
            api.changeLike(card.getCardId(), card.isLiked())
            .then(data => {
                card.addLike(data);
            })
            .catch(err => 
                console.log(`Ошибка статуса лайка: ${err}`))
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

userAvatar.addEventListener('click', function () {
    formValidators['avatar-form'].disableSubmitButton();
    popupAvatar.open();
});

api.getAppData()
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
