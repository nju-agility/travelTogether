var box = document.getElementById('header-box');
var boxOffset = box.offsetTop;
var cards = document.getElementsByClassName('card');

window.onscroll = function(e) {
  animations(e);
}

function animations(e) {
  // Sticky nav
  var boxDistance = boxOffset - window.pageYOffset;
  if (boxDistance <= 0) {
    box.classList.add('fixed');
  }
  else {
    box.classList.remove('fixed');
  }

  // Animated cards
  var index;
  var newIndex = 0;
  for (index = 0; index < cards.length; ++index) {
    var offsetCard = offset(cards[index]);
    if ((offsetCard.top <= window.pageYOffset + window.innerHeight) && !cards[index].classList.contains('active')) {
      cards[index].setAttribute('style', 'transition-delay: '+ 0.1*newIndex +'s');
      cards[index].classList.add('active');
      newIndex++;
    }
  }

  // Progress bar
  var s = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  var body = document.body;
  var html = document.documentElement;
  var d = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  var c = window.innerHeight;
  var position = (s / (d - c)) * 100;
  document.getElementById('progress').setAttribute('style', 'width: ' + position + '%');
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

animations();
