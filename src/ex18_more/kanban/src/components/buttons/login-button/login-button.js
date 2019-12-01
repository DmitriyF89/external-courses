function createLoginButtonTemplate() {
  return `
  <button class="login">
    <img src="./src/components/buttons/login-button/img/avatar.svg" alt="avatar">
    <img 
      class="login__arrow" 
      src="./src/components/buttons/login-button/img/arrow.svg" alt="arrow">
  </button>
  `
}

function createUserMenuTemplate(name = 'User name', email = 'User email') {
  return `
    <div class="user-acc">
      <img class="user-acc__avatar" src="./src/components/buttons/login-button/img/avatar.svg" alt="avatar">
      <div class="user-acc__info">
        <p class="user-acc__nickname">${name}</p>
        <p class="user-acc__email">${email}</p>
      </div>
      <button class="user-acc__accountSettings">Account settings</button>
      <button class="user-acc__logout">Log out</button>
      <a href="#" class="user-acc__terms">Terms of use</a>
    </div>
  `
}

function toggleUserMenu() {
  const
    accountButton = document.querySelector('.login'),
    loginIconArrow = document.querySelector('.login__arrow'),
    mainMenu = document.querySelector('.main-content'),
    userAccMenuTemplate = createUserMenuTemplate();
  ;

  let isMenuOpen = false;

  function clickOnUserMenu() {
    if (!isMenuOpen) {
      mainMenu.insertAdjacentHTML('afterend', userAccMenuTemplate);
      isMenuOpen = true;
      loginIconArrow.classList.toggle('rotate180');
    } else {
      const userAccMenu = document.querySelector('.user-acc');
      userAccMenu.remove();
      loginIconArrow.classList.toggle('rotate180');
      isMenuOpen = false;
    }
  }

  accountButton.addEventListener('click', clickOnUserMenu);
}

export { toggleUserMenu, createLoginButtonTemplate };