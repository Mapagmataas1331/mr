var mousePosition;
var offset = [0,0];
var isDown = false;

const canvas = document.getElementById("canvas");
const CANVAS_WIGHT = 1600;
const CANVAS_HEIGHT = 900;

const root = document.querySelector(':root');
root.style.setProperty('--CANVAS_WIGHT', CANVAS_WIGHT + "px");
root.style.setProperty('--CANVAS_HEIGHT', CANVAS_HEIGHT + "px");

var ctx = canvas.getContext("2d");

canvas.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        canvas.offsetLeft - e.clientX,
        canvas.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        canvas.style.left = (mousePosition.x + offset[0]) + 'px';
        canvas.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);