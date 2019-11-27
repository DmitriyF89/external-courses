const
  slider = document.querySelector('.slider'),
  prevButton = document.querySelector('.slider__button_prevBtn'),
  nextButton = document.querySelector('.slider__button_nextBtn'),
  sliderItems = document.querySelectorAll('.slider__item');

let currentSliderImage = 0;

function addClassVisible(current, list) {
  list.forEach((element, index) => {
    if (index !== current) {
      element.classList.remove('visible');
    } else {
      element.classList.add('visible');
    }
  });
}

addClassVisible(currentSliderImage, sliderItems);

function clickOnSliderButton(event) {
  if (event.target.closest('.slider__button_next-btn') === nextButton) {
    currentSliderImage = (currentSliderImage >= sliderItems.length - 1 ? 0 : ++currentSliderImage);
    addClassVisible(currentSliderImage, sliderItems);
  }

  if (event.target.closest('.slider__button_prev-btn') === prevButton) {
    currentSliderImage = (currentSliderImage <= 0 ? sliderItems.length - 1 : --currentSliderImage);
    addClassVisible(currentSliderImage, sliderItems);
  }
}

slider.addEventListener('click', clickOnSliderButton);

window.addEventListener('unload', () => { slider.removeEventListener('click', clickOnSliderButton) });