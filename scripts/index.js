
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add');

const imagePopup = document.querySelector('.popup_type_image');
const imageTitle = document.querySelector('.popup__caption')
const imageEnlarged = document.querySelector('.popup__image')

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const submitAddCardForm = addCardPopup.querySelector('.popup_form_add');
const submitProfileInfoForm = editProfilePopup.querySelector('.popup_form_edit')
const addCardNameInput = addCardPopup.querySelector('.popup__input_add_name');
const addCardImageInput = addCardPopup.querySelector('.popup__input_add_image');

const closeProfilePopupButton = editProfilePopup.querySelector('.popup__close');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close');
const closeImagePopupButton = imagePopup.querySelector('.popup__close')

const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const nameInput = editProfilePopup.querySelector('.popup__input_profile_name');
const professionInput = editProfilePopup.querySelector('.popup__input_profile_profession');

const cardTemplate = document.getElementById('card-template');
const elementsGroup = document.querySelector('.elements__group');

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened')
};

editProfileButton.addEventListener('click', function() {
    openPopup(editProfilePopup);
    nameInput.value = nameProfile.textContent; 
    professionInput.value = professionProfile.textContent;
}); 

closeProfilePopupButton.addEventListener('click', function() {
    closePopup(editProfilePopup);
});

submitProfileInfoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    professionProfile.textContent = professionInput.value;
    closePopup(editProfilePopup);
});

addCardButton.addEventListener('click', function() {
    openPopup(addCardPopup);
});

closeAddCardPopupButton.addEventListener('click', function() {
    closePopup(addCardPopup);
});

function createCard(name, link) {
    const newCardElement = cardTemplate.cloneNode(true).content;
    const cardImageElement = newCardElement.querySelector('.card__image');
    const cardTitleElement = newCardElement.querySelector('.card__title');
    const removeCardElement = newCardElement.querySelector('.card')
    const deleteButton = newCardElement.querySelector('.card__basket')
    const likeCardButton = newCardElement.querySelector('.card__heart')
    
    cardTitleElement.textContent = name;
    cardImageElement.src = link;

    cardImageElement.addEventListener('click', function() {
        openPopup(imagePopup);
        imageTitle.textContent = name;
        imageEnlarged.src = link;
    });

    closeImagePopupButton.addEventListener('click', function() {
        closePopup(imagePopup);
    });

    deleteButton.addEventListener('click', function() {
        removeCardElement.remove();
    });

    likeCardButton.addEventListener('click', function (e) {
        e.target.classList.toggle('card__heart_active');
    });

    elementsGroup.prepend(newCardElement);
}

initialCards.reverse().forEach((currentData) => {
    createCard(currentData.name, currentData.link);
});

submitAddCardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const addCardName = addCardNameInput.value;
    const addCardImage = addCardImageInput.value;
    createCard(addCardName, addCardImage);
    closePopup(addCardPopup);
});

