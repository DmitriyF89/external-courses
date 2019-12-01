export function createAddCardButtonTemplate(title) {
  return `
    <button class="add-button" data-list-name="${title}">
      <svg class="add-button__plus" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path d="m13 6h-5v-5c0-0.552-0.448-1-1-1s-1 0.448-1 1v5h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h5v5c0 0.552 0.448 1 1 1s1-0.448 1-1v-5h5c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
      </svg>
      Add card
    </button>
  `
}

