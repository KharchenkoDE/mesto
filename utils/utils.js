export function openPopup(popup, closePopupEscape, closePopupClick) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
    document.addEventListener('mousedown', closePopupClick);
};