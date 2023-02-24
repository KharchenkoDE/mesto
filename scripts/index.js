const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');

const imagePopup = document.querySelector('.popup_type_image');
const imageTitle = document.querySelector('.popup__caption');
const imageEnlarged = document.querySelector('.popup__image');

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

const cardTemplate = document.getElementById('card-template');
const cardsContainer = document.querySelector('.elements__group'); 

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
    document.addEventListener('mousedown', closePopupClick);
};

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

function closePopupClick(e) {
    const popupVisible = document.querySelector('.popup_opened');
    if(e.target === popupVisible) {
        if(popupVisible) {
            closePopup(popupVisible);
        };
    };
};

function createCard(name, link) {
    const newCard = cardTemplate.cloneNode(true).content;
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const cardRemove = newCard.querySelector('.card')
    const cardDeleteButton = newCard.querySelector('.card__basket')
    const cardLikeButton = newCard.querySelector('.card__heart')

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    cardImage.addEventListener('click', function () {
        openPopup(imagePopup);
        imageTitle.textContent = name;
        imageEnlarged.src = link;
        imageEnlarged.alt = name;

    });

    cardDeleteButton.addEventListener('click', function () {
        cardRemove.remove();
    });

    cardLikeButton.addEventListener('click', function (e) {
        e.target.classList.toggle('card__heart_active');
    });

    return newCard;
};

initialCards.forEach(card => {
    cardsContainer.append(createCard(card.name, card.link))
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = nameProfile.textContent; 
    professionInput.value = professionProfile.textContent;
    removeValidationErrors(profileEditPopup, validationConfig);
    toggleButtonState(createInputList(profileSubmitInfoForm, validationConfig.inputSelector), profileSubmitInfoForm.querySelector(validationConfig.submitButtonSelector), validationConfig);
    openPopup(profileEditPopup);
}); 

profileSubmitInfoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    professionProfile.textContent = professionInput.value;
    closePopup(profileEditPopup);
});

cardAddButton.addEventListener('click', function () {
    cardSubmitAddForm.reset();
    openPopup(cardAddPopup);
    removeValidationErrors(cardAddPopup, validationConfig);
});

cardSubmitAddForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const cardAddName = cardAddNameInput.value;
    const cardAddImage = cardAddImageInput.value;
    cardsContainer.prepend(createCard(cardAddName, cardAddImage));
    closePopup(cardAddPopup);
});

popupCloseButtons.forEach(item => {
    item.addEventListener('click', function () {
        const popup = item.closest('.popup');
        closePopup(popup);
    });
});
