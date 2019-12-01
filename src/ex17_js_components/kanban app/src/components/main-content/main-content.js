import { createTaskBlockTemplate } from '../task-block/task-block.js';

function createTaskBlocks(state) {
  return state.map(element => createTaskBlockTemplate(element)).join(' ');
}

function createMainContentTemplate(state) {
  return `
    <div class="main-content-wrapper">
      <div class="main-content">
        ${createTaskBlocks(state)}
      </div>
    </div>
  `
}

export { createMainContentTemplate };