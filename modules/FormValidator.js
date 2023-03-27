export class FormValidator {
    constructor(data, formElement) {
        this._data = data;
        this._formElement = formElement;
        this._inputsList = Array.from( this._formElement.querySelectorAll(this._data.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    };

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._data.errorClass);
    };
      
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._data.inputErrorClass);
        errorElement.classList.remove(this._data.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
        } else {
          this._hideInputError(inputElement);
        };
    };

    _hasInvalidInput() {
        return this._inputsList.some((inputElement) => { 
            return !inputElement.validity.valid
        });
    };

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._data.inactiveButtonClass);
        this._buttonElement.disabled = false;
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._data.inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    _removeValidationErrors() {
        this._inputsList.forEach(input => {
          this._hideInputError(input);
        });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._enableSubmitButton();
        };
    };

    _setEventListeners() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        this._formElement.addEventListener('reset', () => {
            this._removeValidationErrors();
            this._toggleButtonState();
        });

        this._inputsList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
} 
   