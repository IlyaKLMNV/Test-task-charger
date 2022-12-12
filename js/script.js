class Slider {
  constructor(element) {
    this.counter = 0;

    this.element = element;
    this.sliderCards = this.element.getElementsByClassName('slider_cards')[0];
    this.cards = this.element.getElementsByClassName('slider_card');
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
    if (typeof value === 'number') {
      console.log('value', value)
      const translate = value;
      this.sliderCards.style.transform = `translateX(${value}px)`;
    }
  }
  
  set _counter(value) {
    if (typeof value === 'number') {
      const lastIdx = this.cardsLength - 1;
      if (value < 0) value = lastIdx;
      if (value > lastIdx) value = 0;
      
      this.setActive(value)
    }
  }
  
  setActive(idx) {
    this.setActiveClass('remove');
    this.counter = idx;
    this.setActiveClass('add');
    
    this.moveActiveToCenter();
  }
  setActiveClass(method) {
    this.cards[this.counter].classList[method]('slider_card--active');
  }
  
  moveActiveToCenter = () => {
    const activeCard = this.cards[this.counter];
    const cardCenterX = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    const exceptedCenterX = this.element.offsetLeft + this.element.offsetWidth / 2;
    console.log(this.counter, this.element.offsetLeft, activeCard.offsetLeft)
    this._translateX = exceptedCenterX - cardCenterX;
  }
  
  goLeft = () => {
    this._counter = this.counter - 1;
  }
  goRight = () => {
    this._counter = this.counter + 1;
  }
}

const slider = new Slider(document.getElementById('slider'));
slider.init();

const text = document.querySelector('.rolling-inscription_text p');
text.innerHTML = text.innerText.split("").map(
  (char, i) =>
  `<span style="transform:rotate(${i * 9.8}deg)">${char}</span>`
).join("")

