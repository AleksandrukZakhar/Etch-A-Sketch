const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const paletteContainer = document.querySelector(".palette-container");
const erase = document.querySelector(".erase");
const clear = document.querySelector(".clear");

const palette = [
  "hsl(0, 0%, 0%)",
  "hsl(0, 100%, 50%)",
  "hsl(120, 100%, 25%)",
  "hsl(240, 100%, 50%)",
  "hsl(39, 100%, 50%)",
  "hsl(60, 100%, 50%)",
  "hsl(300, 100%, 25%)",
  "hsl(197, 71%, 73%)",
];

let currColor = null;
let draw = false;

canvas.width = 400;
canvas.height = 400;

const generateColorPalette = () => {
  palette.forEach((color) => {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("color");
    colorBlock.setAttribute("style", `background-color: ${color}`);

    colorBlock.addEventListener("click", () => {
      currColor = color;
    });

    paletteContainer.appendChild(colorBlock);
  });
};

generateColorPalette();

const eraseFunc = () => (currColor = "hsl(0, 0%, 100%)");
const clearFunc = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

erase.addEventListener("click", eraseFunc);
clear.addEventListener("click", clearFunc);

canvas.addEventListener("mousedown", () => (draw = true));

canvas.addEventListener("mouseup", () => {
  draw = false;
  ctx.beginPath();
});

const paint = (e) => {
  if (!draw) return;

  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.lineTo(e.clientX, e.clientY);
  ctx.strokeStyle = currColor;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
};

canvas.addEventListener("mousemove", (e) => paint(e));
