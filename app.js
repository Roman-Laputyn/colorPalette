const columns = document.querySelectorAll('.column');

// find out which button is pressed
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() == 'space') {
    setColors();
  }
});

document.addEventListener('click', (e) => {
  const type = e.target.dataset.type;

  if (type == 'lock') {
    const node = e.target.tagName.toLowerCase() == 'i' ? e.target : e.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type == 'copy') {
    copyHexColor(e.target.textContent);
  }
});

// First approach for getting random color
function getRandomColor() {
  const hex = '0123456789ABCDEF';
  let hexColor = '';
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * hex.length)];
  }
  return '#' + hexColor;
}

function copyHexColor(text) {
  return navigator.clipboard.writeText(text);
}

// set random collor for each column
function setColors(isInitial) {
  const colors = isInitial ? getColorFromHash() : [];
  columns.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    // Second approach for getting random color using chroma.js
    const hexRandomColor = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(hexRandomColor);
    }

    text.textContent = hexRandomColor;
    col.style.background = hexRandomColor;

    setTextColor(text, hexRandomColor);
    setTextColor(button, hexRandomColor);
  });

  updateColorHash(colors);
}

// change text and button color that depends on luminance
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorHash(colors = []) {
  document.location.hash = colors.map((c) => c.toString().substring(1)).join('-');
}

function getColorFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color);
  }
  return [];
}

setColors(true);
