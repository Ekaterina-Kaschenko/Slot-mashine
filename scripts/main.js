var SlotMachine;
SlotMachine = (function () {
  var _startButton, _spinButton, _slotReels, _slotImg, _maxTime, _picHeight, _speeds, _reelValue, _txt, _begin;

  _startButton = document.getElementsByClassName('button_start')[0];
  _spinButton  = document.getElementsByClassName('spin__button')[0];
  _slotReels   = document.querySelectorAll('.slot__elem');
  _slotImg     = document.getElementsByClassName('slot__img')[0];
  _maxTime     = 3000;
  _picHeight      = 838;
  _speeds      = [];
  _reelValue           = [];
  _begin       = undefined;

  function SlotMachine() {
    this.init();
  }

  SlotMachine.prototype.init = function () {
    for (var i = 0; i < _slotReels.length; i++) {
      _slotReels[i].innerHTML = '<img src="./images/slots.png" alt="image" />';
    }

    _startButton.addEventListener('click', this.daMagic);
  };

  SlotMachine.prototype.daMagic = function () {
    if (typeof _begin !== 'undefined') { return; }

    for (var i = 0; i < 3; ++i) {
      _speeds[i] = Math.random() + .5;
      _reelValue[i] = (Math.random() * 3 | 0) * _picHeight / 4;
    }

    SlotMachine.prototype.animate();
    _slotImg.style.display = 'none';
  };

  SlotMachine.prototype.modal = function () {
    var modalElem      = document.getElementsByClassName('modal')[0];
    var checkboxElem   = document.getElementsByClassName('age')[0];
    var continueButton = document.getElementsByClassName('continue')[0];

    modalElem.classList.add('modal_opened');

    continueButton.addEventListener('click', function() {
      if (checkboxElem.checked) {
        modalElem.classList.remove('modal_opened');
      }
    });
  };

  SlotMachine.prototype.animate = function (now) {
    if (!_begin) { _begin = now; }

    var t = now - _begin || 0;
    for (var i = 0; i < 3; ++i) {
      _slotReels[i].scrollTop = (_speeds[i] / _maxTime / 2 * (_maxTime - t) * (_maxTime - t) + _reelValue[i]) % _picHeight | 0;
    }

    if (t < _maxTime) {
      requestAnimationFrame(SlotMachine.prototype.animate);
    } else {
      _begin = undefined;
      SlotMachine.prototype.checkWinner();
    }
  };

  SlotMachine.prototype.checkWinner = function () {
    _slotImg.style.display = 'inline-block';

    if (_reelValue[0] === _reelValue[1] && _reelValue[1] === _reelValue[2]) {
      _slotImg.src = './images/top_label.gif';
      this.modal();
    } else {
      _slotImg.src = './images/you_lose.gif';
      _spinButton.src = './images/retry_button.gif';
    }
  };

  return SlotMachine;
})();

new SlotMachine();
