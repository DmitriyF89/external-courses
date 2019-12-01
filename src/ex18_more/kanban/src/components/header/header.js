import { createNewListButtonTemplate } from '../buttons/new-list-button/new-list-button.js';
import { createLoginButtonTemplate } from '../buttons/login-button/login-button.js';

export function createHeaderTemplate() {
  return `
    <header class="header">
      <div class="header__intro">
        <div class="header__logo">
          <img src="./src/components/header/img/logo.svg" alt="logo">
        </div>
        <h2 class="header__title">Awesome kanban board</h2>
      </div>
      <div class="header__user-menu">
      <div class="new-list-button-wrapper">
        ${createNewListButtonTemplate()}
      </div>
        ${createLoginButtonTemplate()}
      </div>
    </header>
  `
}