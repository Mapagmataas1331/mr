import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDldImgMMD3pvuVGb2_1VK8r5_ByE3Hb9U",
  authDomain: "mrdot-db.firebaseapp.com",
  databaseURL: "https://mrdot-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mrdot-db",
  storageBucket: "mrdot-db.appspot.com",
  messagingSenderId: "851420730663",
  appId: "1:851420730663:web:96a9f2dcdf55106bb7c502",
  measurementId: "G-WXW3VEP5Z6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

trans_arr.push(
  "Pixel:", "Пиксель:",
  "Owner:", "Владелец:",
  "Menu", "Меню",
);

const CANVAS_WIGHT = 1600;
const CANVAS_HEIGHT = 900;

document.querySelector(':root').style.setProperty('--CANVAS_WIGHT', CANVAS_WIGHT + "px");
document.querySelector(':root').style.setProperty('--CANVAS_HEIGHT', CANVAS_HEIGHT + "px");
document.getElementById("canvas").getContext("2d").canvas.width = CANVAS_WIGHT;
document.getElementById("canvas").getContext("2d").canvas.height = CANVAS_HEIGHT;

const sItem = document.getElementById("selected_item");
const pCoords = document.getElementById("coords");
const pOwner = document.getElementById("owner");
const cont = document.getElementById("content");

var mousePosition;
var offset = [0,0];
var cc = {x: 0, y: 0};
var isDown = false;
var zoom = 1;

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

cont.addEventListener("touchstart", touchHandler, true);
cont.addEventListener("touchmove", touchHandler, true);
cont.addEventListener("touchend", touchHandler, true);
cont.addEventListener("touchcancel", touchHandler, true);

// Запись текущего положения мыши на Canvas'е и Экране,
// Подсчет отступов учитывая zoom и положение мыши,
// И одномоментное перемещение Select'а.
cont.addEventListener('mousedown', (e) => {
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
  if (canvas.contains(e.target) && cc.x > 0 && cc.x <= CANVAS_WIGHT && cc.y > 0 && cc.y <= CANVAS_HEIGHT) {
    console.log(`select: ${Math.ceil(cc.x/10)} ${Math.ceil(cc.y/10)};\ncanvas: ${cc.x} ${cc.y};\nclient: ${e.clientX} ${e.clientY}`);
    pCoords.innerHTML = Math.ceil(cc.y/10) + " " + Math.ceil(cc.x/10);
    sItem.style.display = "block";
    sItem.style.left = (mousePosition.x + offset[0] + Math.ceil(cc.x/10) * 10 - 11.5) + 'px';
    sItem.style.top = (mousePosition.y + offset[1] + Math.ceil(cc.y/10) * 10 - 11.5) + 'px';
  } else {
    pCoords.innerHTML = "_ _";
    sItem.style.display = "none";
  }
}, true);

document.addEventListener('mouseup', () => { isDown = false; }, true);

// Запись перемещения мыши, перемещение Canvas'а и Select'а.
cont.addEventListener('mousemove', (e) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
  if (isDown) {
    canvas.style.left = (mousePosition.x + offset[0]) + 'px';
    canvas.style.top = (mousePosition.y + offset[1]) + 'px';
    sItem.style.left = (mousePosition.x + offset[0] + Math.ceil(cc.x/10) * 10 - 11.5) + 'px';
    sItem.style.top = (mousePosition.y + offset[1] + Math.ceil(cc.y/10) * 10 - 11.5) + 'px';
  }
  e.preventDefault();
}, true);

// Zoom Canvas'а и Select'а.
cont.onwheel = sItem.onwheel = (e) => {
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

document.getElementById("menu-btn").addEventListener("click", () => {
  const menu = document.getElementById("pixel-menu");
  if (menu.style.display == "none") {
    menu.style.display = "block";
  } else menu.style.display = "none";
  ctx.strokeStyle = "#000000";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;
  var ctxy = (pCoords.innerHTML.split(" ")[0] - 1) * 10;
  var ctxx = (pCoords.innerHTML.split(" ")[1] - 1) * 10;
  ctx.fillStyle = "#000000";
  ctx.fillRect(ctxx, ctxy, 10, 10);
}, false);

// Сохранение Canvas'а.
pOwner.onclick = () => {
  const link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}
