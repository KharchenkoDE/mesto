export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputsList = Array.from( this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    };

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };
      
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
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
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = false;
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
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
   