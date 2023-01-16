let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = popupForm.querySelector('.popup__input_profile_name');
let inputProfession = popupForm.querySelector('.popup__input_profile_profession');

function openPopupForm() {
    
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    
    popup.classList.add('popup_opened');
};

function closePopupForm() {
    popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    
    closePopupForm();

}

editButton.addEventListener('click', openPopupForm);

closePopup.addEventListener('click', closePopupForm);

popupForm.addEventListener('submit', handleFormSubmit);



