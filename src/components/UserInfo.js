export class UserInfo {
    constructor({nameSelector, dataSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._dataElement = document.querySelector(dataSelector);
    }
  
    getUserInfo() {
      return {
        userName: this._nameElement.textContent,
        userData: this._dataElement.textContent
      }
    }
  
    setUserInfo({ userName, userData }) {
      this._nameElement.textContent = userName;
      this._dataElement.textContent = userData;
    }
  }