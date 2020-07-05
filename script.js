var sample = document.querySelectorAll('.sample');
var colorDisplay = document.getElementById('colorDisplay');
var title = document.getElementById('title');
var messageDisplay = document.getElementById('message');
var resetBtn = document.getElementById('resetBtn');
var modeBtn = document.getElementById('modeBtn');
var hintBtn = document.getElementById('hintBtn');
var levels = document.querySelectorAll('.level');

var numOfSamples = 6;
var colors = [];
var pickedColor;
var hint;
var hexList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

setupLevel();
startGame();

resetBtn.addEventListener('click', function () {
  startGame();
});

hintBtn.addEventListener('click', function () {
  if (modeBtn.textContent === 'HEX') {
    console.log(pickedColor);
    hint = hex2rgb(pickedColor);
  } else {
    hint = rgb2hex(pickedColor);
  }
  colorDisplay.textContent += ' = ' + hint;
  hintBtn.disabled = true;
  hintBtn.classList.add('selected');
});

modeBtn.addEventListener('click', function () {
  if (modeBtn.textContent === 'RGB') {
    modeBtn.textContent = 'HEX';
  } else {
    modeBtn.textContent = 'RGB';
  }
  startGame();
});

function setupLevel() {
  for (var i = 0; i < levels.length; i++) {
    levels[i].addEventListener('click', function () {
      levels[0].classList.remove('selected');
      levels[1].classList.remove('selected');
      levels[2].classList.remove('selected');
      this.classList.add('selected');

      if (this.textContent === 'Easy') {
        numOfSamples = 3;
      } else if (this.textContent === 'Medium') {
        numOfSamples = 6;
      } else {
        numOfSamples = 9;
      }
      startGame();
    });
  }
}

function startGame() {
  reset();
  for (var i = 0; i < sample.length; i++) {
    if (colors[i]) {
      sample[i].style.backgroundColor = colors[i];
      sample[i].style.display = 'block';
    } else {
      sample[i].style.display = 'none';
    }

    sample[i].addEventListener('click', function () {
      var clickedColor = this.style.backgroundColor;
      if (modeBtn.textContent === 'HEX') {
        clickedColor = rgb2hex(clickedColor);
      }

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetBtn.textContent = 'Play again?';
        changeColors(clickedColor);
      } else {
        this.style.backgroundColor = 'black';
        messageDisplay.textContent = 'Try again!';
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numOfSamples);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = '';
  resetBtn.textContent = 'New colors';
  colorDisplay.textContent = pickedColor;
  title.style.backgroundColor = 'steelblue';
  hintBtn.disabled = false;
  hintBtn.classList.remove('selected');
}

function changeColors(color) {
  for (var i = 0; i < sample.length; i++) {
    sample[i].style.backgroundColor = color;
  }
  title.style.backgroundColor = color;
}

function pickColor() {
  var rand = Math.floor(Math.random() * colors.length);
  return colors[rand];
}

function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  if (modeBtn.textContent === 'RGB') {
    var red = Math.floor(Math.random() * 255 + 1);
    var green = Math.floor(Math.random() * 255 + 1);
    var blue = Math.floor(Math.random() * 255 + 1);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  } else {
    var red =
      hexList[Math.floor(Math.random() * hexList.length)] +
      hexList[Math.floor(Math.random() * hexList.length)];
    var green =
      hexList[Math.floor(Math.random() * hexList.length)] +
      hexList[Math.floor(Math.random() * hexList.length)];
    var blue =
      hexList[Math.floor(Math.random() * hexList.length)] +
      hexList[Math.floor(Math.random() * hexList.length)];
    return '#' + red + green + blue;
  }
}

function hex2rgb(hex) {
  var str = hex.split('');
  var result = 'rgb( ';

  for (var i = 1; i < str.length; i += 2) {
    var firstDigit = Math.floor(hexList.indexOf(str[i]) * hexList.length);
    var secondDigit = Number(hexList.indexOf(str[i + 1]));
    if (i + 1 === str.length - 1) {
      result += firstDigit + secondDigit + ')';
    } else {
      result += firstDigit + secondDigit + ', ';
    }
  }
  return result;
}

function rgb2hex(rgb) {
  var str = rgb.match(/(\d+)/g);
  var result = '#';
  str.forEach(function (code) {
    var firstDigitIndex = Math.floor(code / hexList.length);
    var secondDigitIndex = Math.floor((code / hexList.length - firstDigitIndex) * hexList.length);
    result += hexList[firstDigitIndex] + hexList[secondDigitIndex];
  });
  return result;
}
