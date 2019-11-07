const
  slider = document.querySelector('.slider'),
  prevButton = document.querySelector('.slider__button_prevBtn'),
  nextButton = document.querySelector('.slider__button_nextBtn'),
  sliderItems = document.getElementsByClassName('slider__item');

let current = 0;

function addClassVisible(current, list) {
  list[current].classList.add('visible');
  for (let i = 0; i < list.length; i++) {
    if (i !== current) {
      list[i].classList.remove('visible');
    }
  }
}

addClassVisible(current, sliderItems);

slider.addEventListener('click', function () {
  if (event.target.closest('.slider__button_next-btn') === nextButton) {
    current = (current >= sliderItems.length - 1 ? 0 : ++current);
    addClassVisible(current, sliderItems);
  }

  if (event.target.closest('.slider__button_prev-btn') === prevButton) {
    current = (current <= 0 ? sliderItems.length - 1 : --current);
    addClassVisible(current, sliderItems);
  }
});