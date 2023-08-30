const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;

function startDrawing(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  isDrawing = true;
}

function draw(x, y) {
  if (!isDrawing) return;
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

canvas.addEventListener('mousedown', (event) => {
  startDrawing(event.clientX, event.clientY);
});

canvas.addEventListener('mousemove', (event) => {
  draw(event.clientX, event.clientY);
});

canvas.addEventListener('mouseup', () => {
  stopDrawing();
});

canvas.addEventListener('mouseleave', () => {
  stopDrawing();
});

