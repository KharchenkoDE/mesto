import { openPopup } from "../utils/utils.js";

export class Card {
    constructor(cardData, templateSelector, imagePopup, closePopupEscape, closePopupClick) {
        this._cardData = cardData;
        this._card = this._getCardTemplate(templateSelector);
        this._cardLikeButton = this._card.querySelector('.card__heart');
        this._cardDeleteButton = this._card.querySelector('.card__basket');
        this._cardImage = this._card.querySelector('.card__image');
        this._cardTitle = this._card.querySelector('.card__title');
        this._cardElement = this._createCard();
        this._imagePopup = imagePopup;
        this._closePopupEscape = closePopupEscape;
        this._closePopupClick = closePopupClick;
        this._setEventListeners();
    };

    _getCardTemplate(templateSelector) {
        return document
            .querySelector(templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }
    
    _createCard() {
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;
        this._cardTitle.textContent = this._cardData.name;
        return this._card
    };

    _deleteCard() {
        this._card.remove();
    };

    _clickLike() {
        this._cardLikeButton.classList.toggle('card__heart_active');
    };

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => this._clickLike());
        this._cardDeleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => {
            const imagePopupImg = this._imagePopup.querySelector('.popup__image');
            imagePopupImg.src = this._cardData.link;
            imagePopupImg.alt = this._cardData.name;
            this._imagePopup.querySelector('.popup__caption').textContent = this._cardData.name;
            openPopup(this._imagePopup, this._closePopupEscape, this._closePopupClick);
        });
    };

    getCard() {
        return this._cardElement
    };
}
