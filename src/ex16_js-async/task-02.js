const
  input = document.querySelector('.input');

function debounce(event, elem, delay) {
  if (event.key.length === 1) {
    if (!elem.dataset.isDebounce || elem.dataset.isDebounce === 'false') {
      elem.setAttribute('data-is-debounce', true);
      setTimeout(() => {
        elem.setAttribute('data-is-debounce', false);
      }, delay)
    } else {
      event.preventDefault();
    }
  } else {
    return
  }
}

input.addEventListener('keydown', (event) => {
  debounce(event, input, 1000);
});