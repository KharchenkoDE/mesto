let editButton = document.querySelector('.profile-info__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');

function openPopupForm() {
    popup.classList.add('popup_opened');
};

function closePopupForm() {
    popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', openPopupForm);

closePopup.addEventListener('click', closePopupForm);


