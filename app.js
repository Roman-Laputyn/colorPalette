const columns = document.querySelectorAll('.column');

function getRandomColor() {
  const hex = '0123456789ABCDEF';
  let hexColor = '';
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * hex.length)];
  }
  return '#' + hexColor;
}

function setColors() {
  columns.forEach((col) => {
    const text = col.querySelector('h2');
    const randomColor = getRandomColor();

    text.textContent = getRandomColor();
    col.style.background = randomColor;
  });
}

setColors();
