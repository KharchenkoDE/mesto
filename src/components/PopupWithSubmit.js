import { Popup } from "./Popup.js";
import { validationConfig } from "../utils/constants.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupForm = this._popup.querySelector(validationConfig.formSelector);
    }

  setHandleDeleteClick(handleDeleteCard) {
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', () => {
        this._handleDeleteCard();
    });
    super.setEventListeners();
  }
}