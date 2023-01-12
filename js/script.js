class Slider {
  constructor(element) {
    this.counter = 0;
    this.element = element;
    this.sliderCards = this.element.getElementsByClassName('charger-slider_slider__cards')[0];
    this.cards = this.element.getElementsByClassName('charger-slider_slider__card');
    this.cardsLength = this.cards.length;
    this.leftArrow = this.element.getElementsByClassName('button-shevron__left')[0];
    this.rightArrow = this.element.getElementsByClassName('button-shevron__right')[0];
  }
  
  init() {
    this.leftArrow.addEventListener('click', this.goLeft);
    this.rightArrow.addEventListener('click', this.goRight);
    
    this._counter = this.counter;
    
    window.addEventListener('resize', this.moveActiveToCenter);
  }

  set _translateX(value) {
    const translate = value;
    this.sliderCards.style.transform = `translateX(${value}px)`;
  }
  
  set _counter(value) {
    const lastIdx = this.cardsLength - 1;
    if (value < 0) value = lastIdx;
    if (value > lastIdx) value = 0;
    
    this.setActive(value)

  }
  
  setActive(idx) {
    this.setActiveClass('remove');
    this.counter = idx;
    this.setActiveClass('add');
    this.moveActiveToCenter();
  }
  setActiveClass(method) {
    this.cards[this.counter].classList[method]('charger-slider_slider__card--active');
    // this.cards[this.counter].classList[method]('review--active');
  }
  
  moveActiveToCenter = () => {
    const activeCard = this.cards[this.counter];
    const cardCenterX = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    const exceptedCenterX = this.element.offsetLeft + this.element.offsetWidth / 2;
    this._translateX = exceptedCenterX - cardCenterX;
  }
  
  goLeft = () => {
    this._counter = this.counter - 1;
  }
  goRight = () => {
    this._counter = this.counter + 1;
  }
}

addOpenClass = () => {
  document.querySelector('.menu').classList.toggle('open');
}

const button = document.querySelector('.header_button__menu-burger');
button.addEventListener('click', addOpenClass);


const slider = new Slider(document.getElementById('slider'));
slider.init();


const text = document.querySelector('.rolling-inscription_text p');
text.innerHTML = text.innerText.split("").map(
  (char, i) =>
  `<span style="transform:rotate(${i * 9.8}deg)">${char}</span>`
).join("")


