let drawStatus = false;
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";
let mode = "solidColor";

const content = document.querySelector(".content");
const sqrContainer = document.querySelector(".container-square");
const drawStatusDiv = document.createElement("div");
drawStatusDiv.classList.add("draw-status");
const colorPicker = document.querySelector("#color-picker");
const eraserBtn = document.getElementById("eraser");
const eraserAllBtn = document.getElementById("erase-all");
const randomizeBtn = document.getElementById("randomize");
const colorModeBtn = document.getElementById("color-mode");

const slider = document.getElementById("slider");
const displayValue = document.getElementById("display-value");

colorPicker.value = DEFAULT_COLOR;
slider.value = DEFAULT_SIZE;
displayValue.textContent = DEFAULT_SIZE + "x" + DEFAULT_SIZE;

function updateDrawStatus() {
  drawStatusDiv.textContent = drawStatus ? "Status: Drawing" : "Status: Not Drawing";
  content.insertBefore(drawStatusDiv, sqrContainer);
}

function paintSquare(square, color) {
  switch (mode) {
    case "solidColor":
      square.style.background = color;
      break;
    case "eraser":
      square.style.background = "white";
      break;
    case "random":
      square.style.background = randomColor();
      break;
    case "colorPicker":
      square.style.background = colorPicker.value;
      break;
    default:
      break;
  }
}

function createGrid(size) {
  sqrContainer.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    sqrContainer.appendChild(row);

     for (let j = 0; j < size; j++) {
      const divSquare = document.createElement("div");
      divSquare.classList.add("div-square");
      row.appendChild(divSquare);
    } 
  }

  const divSquares = Array.from(document.querySelectorAll(".div-square"));
  
  divSquares.forEach((divSquare) => {
    divSquare.addEventListener("mousedown", () => {
      drawStatus = true;
      updateDrawStatus();
      paintSquare(divSquare, colorPicker.value);
    });

    divSquare.addEventListener("mouseover", () => {
      if (drawStatus) {
        paintSquare(divSquare, colorPicker.value);
      }
    });
  });

  document.addEventListener("mouseup", () => {
    drawStatus = false;
    updateDrawStatus();
  });

}

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

colorModeBtn.addEventListener("click", () => mode = "solidColor", false);
eraserBtn.addEventListener("click", () => mode = "eraser");
randomizeBtn.addEventListener("click", () => mode = "random");
colorPicker.addEventListener("input", () => mode = "colorPicker", false);
eraserAllBtn.addEventListener("click", () => createGrid(slider.value));
slider.addEventListener("input", (e) => {
  displayValue.textContent = e.target.value + "x" + e.target.value;
  createGrid(slider.value);
});

window.onload = () => {
  createGrid(DEFAULT_SIZE);
  updateDrawStatus();
}