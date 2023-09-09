const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

var pencilSizeRange = document.getElementById("pencilSizeRange");
var pencilSizeOutput = document.getElementById("pencilSize");

let pencilSize = parseInt(pencilSizeRange.value);
pencilSizeOutput.innerHTML = pencilSize;

pencilSizeRange.oninput = function() {
  pencilSize = parseInt(this.value);
  pencilSizeOutput.innerHTML = pencilSize;
}

let isDrawing = false;
let isImageUploaded = false;

const MAX_CANVAS_WIDTH = 400;
const MAX_CANVAS_HEIGHT = 300;

function startDrawing(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  isDrawing = true;
}

function drawLine(x, y) {
  if (!isDrawing) return;
  ctx.lineTo(x, y);
  ctx.strokeStyle = `rgba(255, 0, 0, 0.5)`;
  ctx.lineWidth = pencilSize;
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

canvas.addEventListener('mousedown', (event) => {
  if (isImageUploaded) {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;
    startDrawing(mouseX, mouseY);
  }
});

canvas.addEventListener('mousemove', (event) => {
  if (isImageUploaded && isDrawing) {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    ctx.lineWidth = pencilSize;

    drawLine(mouseX, mouseY);
  }
});

canvas.addEventListener('mouseup', () => {
  stopDrawing();
});

canvas.addEventListener('mouseleave', () => {
  stopDrawing();
});

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function() {
        const aspectRatio = image.width / image.height;

        let canvasWidth = image.width;
        let canvasHeight = image.height;

        if (canvasWidth > MAX_CANVAS_WIDTH) {
          canvasWidth = MAX_CANVAS_WIDTH;
          canvasHeight = canvasWidth / aspectRatio;
        }

        if (canvasHeight > MAX_CANVAS_HEIGHT) {
          canvasHeight = MAX_CANVAS_HEIGHT;
          canvasWidth = canvasHeight * aspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        isImageUploaded = true;
      };
    };
    reader.readAsDataURL(file);

    const sliderContainer = document.querySelector(".slide-container");
    sliderContainer.style.display = "block";
  }
}
