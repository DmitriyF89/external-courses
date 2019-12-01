import { createAddCardButtonTemplate } from '../buttons/add-card-button/add-card-button.js';
import { createContextButtonTemplate } from '../buttons/context-menu-button/context-menu-button.js';

function createTaskBlockTemplate(element, index) {
  return `
    <div class="task-block">
      ${createBlockTitle(element.title, index)}
      ${createTaskList(element)}
    </div>`
}

function createBlockTitle(name, index) {
  return `
  <div class="task-block__title">
    <h3 class="task-block__name">${name}</h3>
    <div class="context-button-wrapper">
    ${createContextButtonTemplate(index)}
    </div>
  </div>`
}

function createTaskList({ issues, title }) {
  return `
    <div class="task-block__item-group">
      <ul class="task-block__list">
      ${issues.map(elem => createTask(elem)).join('')}
      ${createAddCardButtonTemplate(title)}
      </ul>
    </div>`
}

function createTask({ title, id }) {
  return `<li class="task-block__item" data-task-id="${id}">${title}</li>`
}

function createTaskInput() {
  return `<input type="text" class="task-block__input">`
}

function createOption(option) {
  const { title, id } = option;
  return `<option data-task-id=${id}>${title}</option>`
}

function createTaskSelect(options) {
  return `
    <select class="task-block__select">
      <option></option>
      ${options.map(element => createOption(element)).join('')}
    </select>`
}

export { createTaskSelect, createTaskInput, createTaskBlockTemplate } 