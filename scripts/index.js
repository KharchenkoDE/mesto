

const editButton = document.querySelector('.profile__edit-button');

const сardsButton = document.querySelector('.profile__add-button')

const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = popupForm.querySelector('.popup__input_profile_name');
const inputProfession = popupForm.querySelector('.popup__input_profile_profession');

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

сardsButton.addEventListener('click', openPopupForm);





