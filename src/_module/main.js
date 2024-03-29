import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAmxecf29skm49tSkfC3m_3PE9ZY37-gvQ",
  authDomain: "madot-db.firebaseapp.com",
  databaseURL: "https://madot-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "madot-db",
  storageBucket: "madot-db.appspot.com",
  messagingSenderId: "459979697765",
  appId: "1:459979697765:web:4d723497e5af66acb7208c",
  measurementId: "G-ZJYS42564D"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var page = getPage();
const langEls = document.querySelectorAll('[data-translate]');
window.trans_arr = [
  "main page", "главная страница",
  "online hub", "онлайн хаб",
  "pixel", "пиксель",
  "your account", "ваш аккаунт",
  "General Settings", "Основные Настройки",
  "Theme:", "Тема:",
  "Dark", "Тёмная",
  "Light", "Светлая",
  "Purple", "Фиолетовая",
  "Purple", "Фиолетовая",
  "Ocean", "Морская",
  "Language:", "Язык:",
  "English", "Английский",
  "Russian", "Русский",
  "Page Settings", "Настройки страницы",
  "Report a problem:", "Сообщить о проблеме:",
];

var tTimeOut = false;

window.addEventListener("load", () => {
  for (var i = 100; i >= 0; i--) {
    document.getElementById("content").style.left = i+"%"
  }
}, false);

const fpPromise = import('@fingerprintjs/fingerprintjs')
.then(FingerprintJS => FingerprintJS.load());

window.user = {id: null, name: null, vid: null};

fpPromise
.then(fp => fp.get())
.then(result => {
  user.vid = result.visitorId;
  console.log("\nVisitor identifier:\n" + user.vid + "\n\n");
  tryToLog(user.vid)
  .then(uname => {
    if (typeof uname != "undefined" && uname != null && uname != "") {
      get(ref(db, "users/" + uname)).then((snapshot) => {
        if (snapshot.exists()) {
          updateVisitor(uname, snapshot.child("username").val(), user.vid);
          if (typeof onLogin != "undefined" && onLogin != null && onLogin != "") onLogin();
        }
      });
    }
  });
});

async function tryToLog(vid) {
  return get(ref(db, "visitor_ids/" + vid)).then((snapshot) => {
    return snapshot.child("user").val();
  });
}

async function timeFromLastVisit(vid) {
  return get(ref(db, "visitor_ids/" + vid)).then((snapshot) => {
    return ((new Date() - Date.parse(snapshot.child("last_visit").val())) / 60000).toFixed(2);
  });
}

window.updateVisitor = async (uname, upname, vid) => {
  user.id = uname;
  user.name = upname;
  console.log("\nLogged in as:\n" + user.id + "\n\n");
  console.log("\nSince last visit:\n" + await timeFromLastVisit(vid) + " minutes\n\n");
  set(ref(db, "visitor_ids/" + vid), {
    user: user.id,
    last_visit: String(new Date())
  });
  setPreferences();
  cusAlert("notify", "Welcome back " + user.name + ",", "you are successfully logged in!");
}

async function setPreferences() {
  get(ref(db, "users/" + user.id + "/preferences")).then((snapshot) => {
    snapshot.forEach(childSnapshot => {
      var active = document.getElementById(childSnapshot.val());
      if (typeof active != "undefined" && active != null && active != "") {
        var params = active.parentElement.querySelectorAll(".setting-param");
        for (var i = 0; i < params.length; i++) {
          if (params[i].classList.contains("current")) params[i].classList.remove("current");
        }
        active.classList.add("current");
        eval("change" + childSnapshot.key + "('" + childSnapshot.val() + "');");
      }
    });
  });
}

async function savePreference(name, value) {
  update(ref(db, "users/" + user.id + "/preferences"), {
    [name]: value
  });
  console.log("\n" + name + " remembered:\n" + value + "\n\n");
}

window.sendReport = async (text) => {
  if (user.id != null) {
    update(ref(db, "reports/" + user.id), {
      [String(new Date())]: text
    })
    cusAlert("notify", "Thank you " + user.name + ",", "your report has been sent!");
  } else {
    cusAlert("alert", "First you need to log in,", "click me to go to login page.", "https://ma.kak.si/account")
  }
}

window.addEventListenerList = (list, event, fn) => {
  list.forEach(snapshot => { snapshot.addEventListener(event, fn, false) });
}

window.hrefTo = (page) => {
  for (var i = 0; i <= 100; i++) {
    document.getElementById("content").style.left = -i+"%"
  }
  setTimeout(() => {
    if (typeof page != undefined && page != null && page != "/index") {
      location.href = page;
    } else location.href = "/";
  }, 250);
}

window.cusAlert = async (type, title, message, link) => {
  var newAlert = document.createElement("div");
  newAlert.className = "notification " + type;
  var alertTitle = document.createElement("p");
  alertTitle.className = "notification-title";
  alertTitle.innerHTML = title;
  newAlert.appendChild(alertTitle);
  var alertMessage = document.createElement("p");
  alertMessage.className = "notification-message";
  alertMessage.innerHTML = message;
  newAlert.appendChild(alertMessage);
  document.getElementById("notification-zone").appendChild(newAlert);
  if (typeof link != "undefined" && link != null && link != "") newAlert.addEventListener("click", () => {
    hrefTo(link);
  }, false);
  setTimeout(() => {
    alertTitle.innerHTML = "• " + title;
    setTimeout(() => {
      alertTitle.innerHTML = "•• " + title;
      setTimeout(() => {
        alertTitle.innerHTML = "••• " + title;
        setTimeout(() => {
          document.getElementById("notification-zone").removeChild(newAlert);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 2000);
}

function getPage() {
  var page = String(document.location.pathname.split("/").slice(-1));
  if (page == "" || page.slice(0, 3) == "ind") {
    page = "in";
  } else if (page.slice(0, 3) == "hub") {
    page = "hub";
  } else if (page.slice(0, 3) == "pix") {
    page = "pixel";
  } else if (page.slice(0, 3) == "res") {
    page = "rest";
  } else if (page.slice(0, 3) == "nov") {
    page = "coin";
  } else {
    hrefTo();
    return;
  }
  document.getElementById("title").innerHTML = "mr." + page;
  document.getElementById("current-page").innerHTML = page;
  if (page == "rest" || page == "coin") return page;
  document.getElementById(page).style.backgroundColor = "var(--third-color)";
  return page;
}

document.getElementById("header").firstElementChild.addEventListener("click", () => {
  if (document.getElementById("navigation").style.display == "none") {
    document.getElementById("settings-menu").style.display = "none";
    document.getElementById("navigation").style.display = "block";
  } else {
    document.getElementById("navigation").style.display = "none";
  }
}, false);

document.getElementById("header").lastElementChild.addEventListener("click", () => {
  if (document.getElementById("settings-menu").style.display == "none") {
    document.getElementById("navigation").style.display = "none";
    document.getElementById("settings-menu").style.display = "block";
  } else {
    document.getElementById("settings-menu").style.display = "none";
  }
}, false);

addEventListenerList(document.querySelectorAll(".nav-item"), "mouseover", (e) => {
  document.getElementById("current-page").innerHTML = e.target.parentElement.id;
  document.getElementById(page).style = null;
});
document.getElementById("navigation").addEventListener("mouseleave", () => {
  document.getElementById("current-page").innerHTML = page;
  document.getElementById(page).style.backgroundColor = "var(--third-color)";
}, false);
addEventListenerList(document.querySelectorAll(".nav-item"), "click", (e) => {
  if (e.target.parentElement.firstElementChild.innerHTML == "account") {
    hrefTo("https://ma.kak.si/account");
  } else hrefTo("/" + e.target.parentElement.firstElementChild.innerHTML);
});

addEventListenerList(document.querySelectorAll(".setting-param"), "click", (e) => {
  var to = tTimeOut;
  eval("change" + e.target.parentElement.firstElementChild.id + "('" + e.target.id + "');");
  if (e.target.parentElement.firstElementChild.id == "lang" && to) return;
  if (user.id != null) savePreference(e.target.parentElement.firstElementChild.id, e.target.id);
  var params = e.target.parentElement.querySelectorAll(".setting-param");
  for (var i = 0; i < params.length; i++) {
    if (params[i].classList.contains("current")) params[i].classList.remove("current");
  }
  e.target.classList.add("current");
});

function changetheme(theme) {
  if (theme == "dark") {
    document.querySelector("body").className = "";
  } else {
    document.querySelector("body").className = theme;
  }
}

function changelang(lang) {
  if (!tTimeOut) {
    tTimeOut = true;
    langEls.forEach((e) => {
      e.innerHTML = translate(lang, e.innerHTML);
    });
    setTimeout(() => {
      tTimeOut = false;
    }, 1000);
  } else cusAlert("alert", "Timeout", "Calm down! You are changing language too fast.");
}

function translate(lang, text) {
  if (lang != "en") {
    for (let i = 0; i < trans_arr.length - 1; i+=2) {
      if (trans_arr[i] == text) return trans_arr[i+1];
    }
  } else {
    for (let i = 1; i < trans_arr.length; i+=2) {
      if (trans_arr[i] == text) return trans_arr[i-1];
    }
  }
  return text;
}