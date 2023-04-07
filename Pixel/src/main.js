var mousePosition;
var offset = [0,0];
var cc = {x: 0, y: 0};
var isDown = false;
var zoom = 1;

trans_arr.push(
  "Pixel:", "Пиксель:",
  "Owner:", "Владелец:",
  "Menu", "Меню",
);

const canvas = document.getElementById("canvas");
const CANVAS_WIGHT = 1600;
const CANVAS_HEIGHT = 900;

const root = document.querySelector(':root');
root.style.setProperty('--CANVAS_WIGHT', CANVAS_WIGHT + "px");
root.style.setProperty('--CANVAS_HEIGHT', CANVAS_HEIGHT + "px");

var ctx = canvas.getContext("2d");
ctx.canvas.width = CANVAS_WIGHT;
ctx.canvas.height = CANVAS_HEIGHT;

const sItem = document.getElementById("selected_item");
const pCoords = document.getElementById("coords")

// Запись текущего положения мыши на Canvas'е и Экране,
// Подсчет отступов учитывая zoom и положение мыши,
// И одномоментное перемещение Select'а.
canvas.addEventListener('mousedown', (e) => {
  isDown = true;
  offset = [
    canvas.offsetLeft - e.clientX,
    canvas.offsetTop - e.clientY
  ];
  cc = {
    x: Math.round(e.layerX / zoom),
    y: Math.round(e.layerY / zoom)
  };
  console.log(`select: ${Math.ceil(cc.x/10)} ${Math.ceil(cc.y/10)};\ncanvas: ${cc.x} ${cc.y};\nclient: ${e.clientX} ${e.clientY}`);
  pCoords.innerHTML = Math.ceil(cc.y/10) + " " + Math.ceil(cc.x/10);
  sItem.style.display = "block";
  sItem.style.left = (mousePosition.x + offset[0] + Math.ceil(cc.x/10) * 10 - 12) + 'px';
  sItem.style.top = (mousePosition.y + offset[1] + Math.ceil(cc.y/10) * 10 - 12) + 'px';
}, true);

document.addEventListener('mouseup', () => {
  isDown = false;
}, true);

// Запись перемещения мыши, перемещение Canvas'а и Select'а.
document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
  if (isDown) {
    canvas.style.left = (mousePosition.x + offset[0]) + 'px';
    canvas.style.top = (mousePosition.y + offset[1]) + 'px';
    sItem.style.left = (mousePosition.x + offset[0] + Math.ceil(cc.x/10) * 10 - 12) + 'px';
    sItem.style.top = (mousePosition.y + offset[1] + Math.ceil(cc.y/10) * 10 - 12) + 'px';
  }
}, true);

// Zoom Canvas'а и Select'а.
canvas.onwheel = (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    zoom += 0.1;
    canvas.style.zoom = zoom;
    sItem.style.zoom = zoom;
  } else {
    zoom -= 0.1;
    canvas.style.zoom = zoom;
    sItem.style.zoom = zoom;
  };
};

// Скрытие Select'а по клику вне canvas'а.
// document.body.addEventListener('click', (e) => {  
//   if (!canvas.contains(e.target)){
//     sItem.style.display = "none";
//   }
// });

// Сохранение Canvas'а.
pCoords.onclick = () => {
  const link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}