const input = document.querySelector('.input');

function debounce(callback, delay) {
  let isCallbackInvoked = false;
  return function () {
    if (isCallbackInvoked) {
      event.preventDefault();
      return;
    }

    callback.call(this);
    isCallbackInvoked = true;
    setTimeout(() => {
      isCallbackInvoked = false;
    }, delay)
  }
}

function handleInputKeydown() {
  // code
}

input.addEventListener('keydown', debounce(handleInputKeydown, 1500));