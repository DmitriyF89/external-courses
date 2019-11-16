const
  accountButton = document.querySelector('.login'),
  loginIconArrow = document.querySelector('.login__arrow'),
  mainMenu = document.querySelector('.main-content'),
  userAccMenuTemplate = `
  <div class="user-acc">
    <img class="user-acc__avatar" src="./src/task-02/user-acc/svg/avatar.svg" alt="avatar">
    <div class="user-acc__info">
      <p class="user-acc__nickname">User name</p>
      <p class="user-acc__email">User email</p>
    </div>
    <button class="user-acc__accountSettings">Account settings</button>
    <button class="user-acc__logout">Log out</button>
    <a href="#" class="user-acc__terms">Terms of use</a>
  </div>
  `;

let isMenuOpen = false;

function toggleUserMenu() {
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

accountButton.addEventListener('click', toggleUserMenu);

window.addEventListener('unload', () => { accountButton.removeEventListener('click', toggleUserMenu) });