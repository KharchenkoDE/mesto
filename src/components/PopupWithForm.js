import { Popup } from './Popup.js'

import { validationConfig } from '../utils/constants.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, submitFunction }) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._inputList = this._popup.querySelectorAll(validationConfig.inputSelector);
        this._popupForm = this._popup.querySelector(validationConfig.formSelector);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', () => {
            this._submitFunction(this._getInputValues());
        });
        super.setEventListeners();
    }
}