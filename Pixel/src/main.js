var mousePosition;
var offset = [0,0];
var isDown = false;

const canvas = document.getElementById("canvas");
const CANVAS_WIGHT = 1600;
const CANVAS_HEIGHT = 900;

// const root = document.querySelector(':root');
// root.style.setProperty('--CANVAS_WIGHT', CANVAS_WIGHT + "px");
// root.style.setProperty('--CANVAS_HEIGHT', CANVAS_HEIGHT + "px");

var ctx = canvas.getContext("2d");
ctx.canvas.width  = CANVAS_WIGHT;
ctx.canvas.height = CANVAS_HEIGHT;
const img = new Image();
img.src = "src/img.jpg";

img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0);
}, false );

canvas.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        canvas.offsetLeft - e.clientX,
        canvas.offsetTop - e.clientY
    ];
    document.getElementById("coords").innerHTML =
    `canvas: ${e.layerX} ${e.layerX}; client: ${e.clientX} ${e.clientY}`;
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(e) {
    e.preventDefault();
    if (isDown) {
        mousePosition = {
            x: e.clientX,
            y: e.clientY
        };
        canvas.style.left = (mousePosition.x + offset[0]) + 'px';
        canvas.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

var zoom = 100;
canvas.onwheel = function(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
        zoom += 10;
        canvas.style.zoom = zoom + "%";
    } else {
        zoom -= 10;
        canvas.style.zoom = zoom + "%";
    };
};