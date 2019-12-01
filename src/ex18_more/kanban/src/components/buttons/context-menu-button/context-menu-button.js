function createContextButtonTemplate(index) {
  return `
    <button data-task-list="${index}" class="context-menu-button">•••</button>
  `
}

function createContextMenu(left, index) {
  return `
    <div 
      data-list-number="${index}"
      class="context-menu-button__options"
      style="top: 100px; left: ${left}px"
      >
      <ul class="context-menu-button__list">
        <li class="context-menu-button__item">
          <button  class="context-menu-button__sub-button">Change block name</button>
        </li>
        <li class="context-menu-button__item">
          <button class="context-menu-button__sub-button">Delete list</button>
        </li>
      </ul>
    </div>
  `
}

export { createContextButtonTemplate, createContextMenu }