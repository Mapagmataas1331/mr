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
  "en", "ру",
);

const canvas = document.getElementById("canvas");
const CANVAS_WIGHT = 2048;
const CANVAS_HEIGHT = 1152;

const root = document.querySelector(':root');
root.style.setProperty('--CANVAS_WIGHT', CANVAS_WIGHT + "px");
root.style.setProperty('--CANVAS_HEIGHT', CANVAS_HEIGHT + "px");

var ctx = canvas.getContext("2d");
ctx.canvas.width = CANVAS_WIGHT;
ctx.canvas.height = CANVAS_HEIGHT;

window.onLogin = async () => {
  var onetime = true;
  setInterval(() => {
    checkAfk();
    if (typeof(db.con) !== 'undefined' && db.con) {
      checkkey();
      if (isTouch) {
        checkjoy();
      }
      getHeroes();
      updateHero(hero_cords.x, hero_cords.y);
      if (onetime) {
        loopIdleAnim();
        onetime = false;
      }
    }
  }, speed);
  if (isTouch) {
    joystick_init();
  }

  logHero();
}

var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
// prevent some touch ios events
// if (isTouch) {
//   document.addEventListener('touchmove', function (event) {
//     if (event.scale !== 1) { event.preventDefault(); }
//   }, false);
//   var lastTouchEnd = 0;
//   document.addEventListener('touchend', function (event) {
//     var now = (new Date()).getTime();
//     if (now - lastTouchEnd <= 300) {
//       event.preventDefault();
//     }
//     lastTouchEnd = now;
//   }, false);
// }

var keymap = {};
onkeydown = onkeyup = (e) => {
  e = e || event;
  keymap[e.keyCode] = e.type == 'keydown';
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkkey() {
    if (keymap[87] || keymap[38]) {
        moveHero(1, 0);
    }
    if (keymap[65] || keymap[37]) {
        moveHero(0, 1);
    }
    if (keymap[68] || keymap[39]) {
        moveHero(0, 0);
    }
    if (keymap[83] || keymap[40]) {
        moveHero(1, 1);
    }
}
function checkjoy() {
    if (joymap.y > 0) {
        moveHero(1, 0);
    }
    if (joymap.x < 0) {
        moveHero(0, 1);
    }
    if (joymap.x > 0) {
        moveHero(0, 0);
    }
    if (joymap.y < 0) {
        moveHero(1, 1);
    }
}

function loopIdleAnim() {
    var randv = rand(2500, 5000);
    setTimeout(function() {
        idleAnim(randv);
        loopIdleAnim();
    }, randv);
}

function moveHero(axis, dir) {
    const main = document.getElementById("main");
    const hero = document.getElementById("hero-" + valsArr.uname);
    if (axis == 0) {
        if (dir == 0) {
            hero_cords.x += 8;
            updateHeroTransform("scaleX(1)");
        } else {
            hero_cords.x -= 8;
            updateHeroTransform("scaleX(-1)");
        }
        hero.style.left = `calc(50% - ${-hero_cords.x + 32}px)`;
        main.style.left = `calc(50vw + ${-hero_cords.x - 1280}px)`;
    } else {
        if (dir == 0) {
            hero_cords.y += 8;
        } else {
            hero_cords.y -= 8;
        }
        hero.style.top = `calc(50% - ${hero_cords.y + 48}px)`;
        main.style.top = `calc(50vh + ${hero_cords.y - 720}px)`;
    }
}

function createHero(user, name, hero, img0, img1, transform, x, y) {
    const main = document.getElementById("main");
    const curHeroName = document.getElementById("hero-" + user + "-name");
    const curHerobox = document.getElementById("hero-" + user + "-box");
    const curHeroimg1 = document.getElementById("hero-" + user + "-img0");
    const curHeroimg2 = document.getElementById("hero-" + user + "-img1");
    if (user == valsArr.uname && valsArr.createHero) {
        valsArr.createHero = false;
        makingHero(user, x, y);
        hero_cords = { x: x, y: y };
        main.style.left = `calc(50vw + ${-x - 1280}px)`;
        main.style.top = `calc(50vh + ${y - 720}px)`;
        return;
    } else if (user == valsArr.uname && !valsArr.createHero){
        checkHeroVals()
        return;
    } else {
        var bgHero = document.getElementById("hero-" + user);
        if (typeof(bgHero) != 'undefined' && bgHero != null) {
            bgHero.style.left = `calc(50% - ${-x + 32}px)`;
            bgHero.style.top = `calc(50% - ${y + 48}px)`;
            checkHeroVals()
        } else {
            makingHero(user, x, y);
        }
    }
    function checkHeroVals() {
        if (curHeroName.innerText != name) {
            curHeroName.innerText = name;
        }
        if (curHerobox.style.transform != transform) {
            curHerobox.style.transform = transform;
            curHerobox.style.webkitTransform = transform;
        }
        if (curHeroimg1.style.backgroundImage != `url('src/img/game/heroes/${hero}-0${img0}.png')`) {
            curHeroimg1.style.backgroundImage = `url('src/img/game/heroes/${hero}-0${img0}.png')`;
        }
        if (curHeroimg2.style.backgroundImage != `url('src/img/game/heroes/${hero}-1${img1}.png')`) {
            curHeroimg2.style.backgroundImage = `url('src/img/game/heroes/${hero}-1${img1}.png')`;
        }
    }
}

function makingHero(user, x, y) {
    const main = document.getElementById("main");
    chHero = document.createElement("div");
    chHero.setAttribute("id", "hero-" + user);
    chHero.classList.add("hero");
    chHero.style.left = `calc(50% - ${-x + 32}px)`;
    chHero.style.top = `calc(50% - ${y + 48}px)`;
    main.appendChild(chHero);
    const chHero_name = document.createElement("p");
    chHero_name.setAttribute("id", "hero-" + user + "-name");
    chHero.appendChild(chHero_name);
    const chHero_box = document.createElement("div");
    chHero_box.setAttribute("id", "hero-" + user + "-box");
    chHero.appendChild(chHero_box);
    const chHero_box0 = document.createElement("div");
    chHero_box0.setAttribute("id", "hero-" + user + "-img0");
    chHero_box.appendChild(chHero_box0);
    const chHero_box1 = document.createElement("div");
    chHero_box1.setAttribute("id", "hero-" + user + "-img1");
    chHero_box.appendChild(chHero_box1);
}

function removeHero(user) {
    var curHero = document.getElementById("hero-" + user);
    if (typeof(curHero) !== 'undefined' && curHero !== null) {
        curHero.remove()
    }
}

function defFunc(func) {
    if (func == "reload") {
        location.reload();
    }
}

function checkAfk() {
  get(ref(database, 'users')).then((snap) => {
    snap.forEach((userSnap) => {
      if (userSnap.child("game").exists) {
        if (userSnap.child("game/online").val()) {
          if (userSnap.child("game/cord_x").val() == userSnap.child("game/cordOld_x").val() && userSnap.child("game/cord_y").val() == userSnap.child("game/cordOld_y").val()) {
            if (userSnap.child("game/afk_time").val() >= 600) {
              update(ref(database, `users/${userSnap.key}/game`), {
                online: false
              });
              update(ref(database, `users/${userSnap.key}/game`), {
                afk_time: 0
              });
            } else {
              update(ref(database, `users/${userSnap.key}/game`), {
                afk_time: userSnap.child("game/afk_time").val() + 1
              });
            }
          } else {
            update(ref(database, `users/${userSnap.key}/game`), {
              cordOld_x: userSnap.child("game/cord_x").val(),
              cordOld_y: userSnap.child("game/cord_y").val(),
              afk_time: 0
            });
          }
        }
      }
    });
  });
}
  
  function logHero() {
    get(ref(database, `users/${valsArr.uname}/game`)).then((snapshot) => {
      if (!(snapshot.exists())) {
        set(ref(database, `users/${valsArr.uname}/game`), {
          cord_x: 0,
          cord_y: 0
        });
      }
      update(ref(database, `users/${valsArr.uname}/game`), {
        online: true,
        img_0: "0",
        img_1: "0"
      });
      db.con = true;
    });
  }
  
  function updateHero(newX, newY) {
    update(ref(database, `users/${valsArr.uname}/game`), {
      cord_x: newX,
      cord_y: newY
    });
  }
  
  function getHeroes() {
    // var id = 0;
    get(ref(database, 'users')).then((snap) => {
      snap.forEach((userSnap) => {
        // id += 1;
        if (userSnap.child("game").exists) {
          if (userSnap.child("game/online").val()) {
            if (userSnap.child("game/afk_time").val() >= 300) {
              createHero(userSnap.key, `${userSnap.key}\n\n\n\n\nAFK: ${Math.trunc(userSnap.child("game/afk_time").val() / 10)}\nkick: ${Math.trunc((600 - userSnap.child("game/afk_time").val()) / 10) + 1}`,
              "00", userSnap.child("game/img_0").val(), userSnap.child("game/img_1").val(), userSnap.child("game/transform").val(), userSnap.child("game/cord_x").val(), userSnap.child("game/cord_y").val());
              db.afk = true;
            } else {
              createHero(userSnap.key, `${userSnap.key}`, "00", userSnap.child("game/img_0").val(), userSnap.child("game/img_1").val(), userSnap.child("game/transform").val(), userSnap.child("game/cord_x").val(), userSnap.child("game/cord_y").val());
              db.afk = false;
            }
            // if (userSnap.child("game/afk_time").val() == 400 && userSnap.key == valsArr.uname) {
            //   customAlert("warn", "You are AFK!", "If you don't move you will be kicked soon.");
            // }
          } else {
            removeHero(userSnap.key);
            if (userSnap.key == valsArr.uname) {
              defFunc("reload");
            }
          }
        }
      });
    });
  }
  
  function idleAnim(randv) {
    if (db.afk && valsArr.idleAnim) {
      valsArr.idleAnim = false;
      setTimeout(function() {
        update(ref(database, `users/${valsArr.uname}/game`), {
          img_0: "1",
        });
        setTimeout(function() {
          update(ref(database, `users/${valsArr.uname}/game`), {
            img_0: "2",
          });
        }, 0.05 * randv);
      }, 0.05 * randv);
    } else if (!db.afk){
      valsArr.idleAnim = true;
      setTimeout(function() {
        update(ref(database, `users/${valsArr.uname}/game`), {
          img_0: "1",
        });
        setTimeout(function() {
          update(ref(database, `users/${valsArr.uname}/game`), {
            img_0: "2",
          });
          setTimeout(function() {
            update(ref(database, `users/${valsArr.uname}/game`), {
              img_0: "1",
            });
           setTimeout(function() {
            update(ref(database, `users/${valsArr.uname}/game`), {
              img_0: "0",
            });
           }, 0.05 * randv);
          }, 0.05 * randv);
        }, 0.05 * randv);
      }, 0.05 * randv);
    }
  }
  
  function updateHeroTransform(value) {
    update(ref(database, `users/${valsArr.uname}/game`), {
      transform: value
    });
  }

// ---------- Joystick ---------- \\
var width, height, radius, x_orig, y_orig;

function joystick_init() {
    canvas = document.getElementById("joystick");
    canvas.style.display = "block";
    ctx = canvas.getContext('2d');
    resize();
    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mousemove', Draw);
    document.addEventListener('touchstart', startDrawing);
    document.addEventListener('touchend', stopDrawing);
    document.addEventListener('touchcancel', stopDrawing);
    document.addEventListener('touchmove', Draw);
    window.addEventListener('resize', resize);
}

function resize() {
    width = window.innerWidth;
    radius = 32;
    height = radius * 6.5;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    background();
    joystick(width / 2, height / 3);
}

function background() {
    x_orig = width / 2;
    y_orig = height / 3;
    ctx.beginPath();
    ctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgba(217, 217, 217, 0.5)';
    ctx.fill();
}

function joystick(width, height) {
    ctx.beginPath();
    ctx.arc(width, height, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = '#f2f2f2';
    ctx.fill();
    ctx.strokeStyle = 'rgba(217, 217, 217, 0.5)';
    ctx.lineWidth = 8;
    ctx.stroke();
}

let abs_joy_coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    var mouse_x = event.clientX || event.touches[0].clientX;
    var mouse_y = event.clientY || event.touches[0].clientY;
    abs_joy_coord.x = mouse_x - canvas.offsetLeft;
    abs_joy_coord.y = mouse_y - canvas.offsetTop;
}

function is_it_in_the_circle() {
    var current_radius = Math.sqrt(Math.pow(abs_joy_coord.x - x_orig, 2) + Math.pow(abs_joy_coord.y - y_orig, 2));
    if (radius >= current_radius) return true
    else return false
}

function startDrawing(event) {
    paint = true;
    getPosition(event);
    if (is_it_in_the_circle()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        joystick(abs_joy_coord.x, abs_joy_coord.y);
        Draw(event);
    }
}

function stopDrawing() {
    paint = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(width / 2, height / 3);
    joymap = { x: 0, y: 0};
}

function Draw(event) {
    if (paint) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        var x, y;
        var angle = Math.atan2((abs_joy_coord.y - y_orig), (abs_joy_coord.x - x_orig));
        if (Math.sign(angle) == -1) {
            angle_in_degrees = Math.round(-angle * 180 / Math.PI);
        }
        else {
            angle_in_degrees =Math.round( 360 - angle * 180 / Math.PI);
        }
        if (is_it_in_the_circle()) {
            joystick(abs_joy_coord.x, abs_joy_coord.y);
            x = abs_joy_coord.x;
            y = abs_joy_coord.y;
        }
        else {
            x = radius * Math.cos(angle) + x_orig;
            y = radius * Math.sin(angle) + y_orig;
            joystick(x, y);
        }
        getPosition(event);
        var x_relative = Math.round(x - x_orig);
        var y_relative = -Math.round(y - y_orig);
        joymap = { x: x_relative, y: y_relative};
    }
} 