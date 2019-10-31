const
  accountButton = document.querySelector('.header__logIn'),
  userAcc = document.querySelector('.userAcc__wrapper'),
  loginIconArrow = document.querySelector('.arrowDown img');

accountButton.addEventListener('click', function () {
  userAcc.style.display = userAcc.style.display === 'block' ? 'none' : 'block';
  loginIconArrow.classList.toggle('rotate180');
});