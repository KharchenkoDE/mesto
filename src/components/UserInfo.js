export class UserInfo {
    constructor({ nameSelector, dataSelector, avatarSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._dataElement = document.querySelector(dataSelector);
      this._avatarElement = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      return {
        userName: this._nameElement.textContent,
        userData: this._dataElement.textContent,
        // userAvatar: this._avatarElement.src
      }
    }

    setUserInfo({ userName, userData, userAvatar }) {
      if(!!userName) {
        this._nameElement.textContent = userName;
      }
      if(!!userData) {
        this._dataElement.textContent = userData;
      }
      // if(!!userAvatar) {
      //   this._avatarElement.src = userAvatar;
      // }
  }
}
