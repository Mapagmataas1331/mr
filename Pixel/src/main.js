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
const pCoords = document.getElementById("coords");
const pOwner = document.getElementById("owner");

window.addEventListener("load", fixCanvas, false);

function fixCanvas() {
  canvas.style.zoom = 0.1;
  sItem.style.zoom = 0.1;
  setTimeout(() => {
    canvas.style.zoom = zoom;
    sItem.style.zoom = zoom;
  }, 100);
}

var footerOffset = 64;
function fixFooterOffset(v) {
  if (v == "up") {
    footerOffset += 4;
  } else if (v == "dw") {
    footerOffset -= 4;
  } else {
    footerOffset = 64 + v;
  }
  document.getElementById("footer").style.top = "calc(100vh - " + footerOffset + "px)";
  document.getElementById("footer-offset-info").innerHTML = "now: " + -(64 - footerOffset);
}

// Перевод touch эвента в mouse
function touchHandler(e) {
  var touches = e.changedTouches,
    first = touches[0],
    type = "";
  switch(e.type) {
    case "touchstart": type = "mousedown"; break;
    case "touchmove":  type = "mousemove"; break;        
    case "touchend":   type = "mouseup";   break;
    default:           return;
  }
// initMouseEvent(type, canBubble, cancelable, view, clickCount, 
//                screenX, screenY, clientX, clientY, ctrlKey, 
//                altKey, shiftKey, metaKey, button, relatedTarget);
  var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                first.screenX, first.screenY, 
                                first.clientX, first.clientY, false, 
                                false, false, false, 0/*left*/, null);
  first.target.dispatchEvent(simulatedEvent);
  e.preventDefault();
}

canvas.addEventListener("touchstart", touchHandler, true);
canvas.addEventListener("touchmove", touchHandler, true);
canvas.addEventListener("touchend", touchHandler, true);
canvas.addEventListener("touchcancel", touchHandler, true);

// Запись текущего положения мыши на Canvas'е и Экране,
// Подсчет отступов учитывая zoom и положение мыши,
// И одномоментное перемещение Select'а.
canvas.addEventListener('mousedown', (e) => {
  isDown = true;
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
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

document.addEventListener('mouseup', () => { isDown = false; }, true);

// Запись перемещения мыши, перемещение Canvas'а и Select'а.
canvas.addEventListener('mousemove', (e) => {
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
  e.preventDefault();
}, true);

// Zoom Canvas'а и Select'а.
canvas.onwheel = sItem.onwheel = (e) => {
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