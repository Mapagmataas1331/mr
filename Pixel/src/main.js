var mousePosition;
var offset = [0,0];
var cc = {x: 0, y: 0};
var isDown = false;
var zoom = 1;

const canvas = document.getElementById("canvas");
const CANVAS_WIGHT = 1600;
const CANVAS_HEIGHT = 900;

const root = document.querySelector(':root');
root.style.setProperty('--CANVAS_WIGHT', CANVAS_WIGHT + "px");
root.style.setProperty('--CANVAS_HEIGHT', CANVAS_HEIGHT + "px");

var ctx = canvas.getContext("2d");
ctx.canvas.width  = CANVAS_WIGHT;
ctx.canvas.height = CANVAS_HEIGHT;

const sItem = document.getElementById("selected_item");

canvas.addEventListener('mousedown', function(e) {
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
    document.getElementById("coords").innerHTML = "Pixel: " + Math.ceil(cc.y/10) + " " + Math.ceil(cc.x/10);
    sItem.style.left = (mousePosition.x + offset[0] + Math.ceil(cc.x/10) * 10 - 12) + 'px';
    sItem.style.top  = (mousePosition.y + offset[1] + Math.ceil(cc.y/10) * 10 - 12) + 'px';
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(e) {
    e.preventDefault();
    mousePosition = {
        x: e.clientX,
        y: e.clientY
    };
    if (isDown) {
        canvas.style.left = (mousePosition.x + offset[0]) + 'px';
        canvas.style.top  = (mousePosition.y + offset[1]) + 'px';
        sItem.style.left = (mousePosition.x + offset[0] + Math.ceil(cc.x/10) * 10 - 12) + 'px';
        sItem.style.top  = (mousePosition.y + offset[1] + Math.ceil(cc.y/10) * 10 - 12) + 'px';
    }
}, true);

canvas.onwheel = function(e) {
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