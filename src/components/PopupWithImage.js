import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCaption = this._popup.querySelector('.popup__caption');
        this._popupImage = this._popup.querySelector('.popup__image');
    }

    open({ link, name }) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}