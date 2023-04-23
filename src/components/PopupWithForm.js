import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ popupSelector, submitFunction,validationConfig }) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._inputList = this._popup.querySelectorAll(validationConfig.inputSelector);
        this._popupForm = this._popup.querySelector(validationConfig.formSelector);
        this._activeButtoninfo = document.querySelector(`${popupSelector} ${validationConfig.submitButtonSelector}`);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
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
    
    renderLoading(loading) {
            if(loading) {
                this._activeButtoninfo.textContent = 'Сохранение...';
            } else {
                this._activeButtoninfo.textContent = 'Сохранить';
            }
    };
}