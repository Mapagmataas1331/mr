import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCE99ycZW0noggD6NnTaa-tu5FYio0OWpE",
  authDomain: "webtest-db.firebaseapp.com",
  databaseURL: "https://webtest-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webtest-db",
  storageBucket: "webtest-db.appspot.com",
  messagingSenderId: "977282304261",
  appId: "1:977282304261:web:180f2b5ef5eaa234900f6c",
  measurementId: "G-MM1VCV4545"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var autoSave = true;
var table = {owner: null, type: null, name: null}
const tableZone = document.getElementById("table-zone");

trans_arr.push(
  "Auto-save:", "Авто-сохранение:",
  "Yes", "Да",
  "No", "Нет",
  "Find Table", "Найти Таблицу",
  "User name:", "Пользователь:",
  "Select table:", "Выберете таблицу:",
  "Create Table", "Создать Таблицу",
  "Table name:", "Имя таблицы:",
  "Select type:", "Выберете тип:",
  "Back", "Назад",
  "Save", "Сохранить",
);

window.onLogin = () => {
  document.getElementById("user-input").innerHTML = user.id;
  checkOwner()
}

function checkOwner() {
  if (user.id != null && user.id == table.owner) {
    document.getElementById("save-btn").style.display = "block";
    tableZone.querySelectorAll("span").forEach(snapshot => {
      snapshot.contentEditable = "true";
    });
  }
}

window.changeautosave = (bool) => {
  if (bool == "true") {
    autoSave = true;
  } else if (bool == "false") {
    autoSave = false;
  }
}

document.getElementById("user-input").addEventListener("keypress", (e) => {
  var value = checkEnter(e);
  if (!value) return;
  const zone = document.getElementById("user-tables-zone");
  while (zone.childElementCount != 0) zone.removeChild(zone.lastChild);
  get(ref(db, "users/" + value.toLowerCase() + "/tables")).then(snapshot => {
    if (!snapshot.exists()) {
      cusAlert("alert", "No such user,", "or he has no tables.");
      return;
    }
    snapshot.forEach(childSnapshot => {
      var newMEl = document.createElement("p");
      get(ref(db, "tables/" + childSnapshot.key)).then(snap => {
        newMEl.innerHTML = snap.child("ENname").val() + "/" + snap.child("RUname").val();
      });
      zone.appendChild(newMEl);
      childSnapshot.forEach(cChildSnapshot => {
        var newEl = document.createElement("p");
        newEl.id = childSnapshot.key;
        newEl.className = "link";
        newEl.style.color = "var(--second-text-color)";
        newEl.innerHTML = cChildSnapshot.key;
        zone.appendChild(newEl);
        newEl.addEventListener("click", () => {
          newEl.style.color = "var(--primary-text-color)";
          setSearch(value.toLowerCase(), newEl.id, newEl.innerHTML);
        }, false);
      });
    });
  });
}, false);
document.getElementById("table-input").addEventListener("keypress", (e) => {
  var value = checkEnter(e);
  if (!value) return;
  if (user.id == null) {
    cusAlert("alert", "First you need to log in,", "click me to go to login page.", "https://ma.kak.si/account");
    return;
  }
  const zone = document.getElementById("tables-types-zone");
  while (zone.childElementCount != 0) zone.removeChild(zone.lastChild);
  get(ref(db, "tables")).then(snapshot => {
    snapshot.forEach(childSnapshot => {
      var newEl = document.createElement("p");
      newEl.id = childSnapshot.key;
      newEl.className = "link";
      newEl.style.color = "var(--second-text-color)";
      newEl.innerHTML = childSnapshot.child("ENname").val() + "/" + childSnapshot.child("RUname").val();
      zone.appendChild(newEl);
      newEl.addEventListener("click", () => {
        newEl.style.color = "var(--primary-text-color)";
        set(ref(db, "users/" + user.id + "/tables/" + newEl.id + "/" + value.toLowerCase()), {
         1: ""
        }).then(() => {
          setSearch(user.id, newEl.id, value.toLowerCase());
        });
      }, false);
    });
  });
}, false);
function checkEnter(e) {
  if (e.keyCode == "13" || e.key == 'Enter') {
    e.preventDefault();
    return e.target.innerHTML;
  } else return false;
}

function setSearch(owner, type, name) {
  location.search = "owner=" + owner + "&type=" + type  + "&name=" + name;
}

window.addEventListener("load", async () => {
  if (location.search == "") return;
  const urlParams = new URLSearchParams(location.search);
  if (urlParams.get("owner") != null && urlParams.get("type") != null && urlParams.get("name") != null) {
    table.owner = urlParams.get("owner");
    table.type = urlParams.get("type");
    table.name = urlParams.get("name");
    document.getElementById("table-menu").style.display = "none";
    tableZone.style.display = "block";
    loadtable();
  } else cusAlert("alert", "Missing parameter(s),", "in url must be 3 parameters (owner, type and name).");
}, false)

document.getElementById("back-btn").addEventListener("click", () => {
  location.search = '';
}, false);

function loadtable() {
  get(ref(db, "tables/" + table.type)).then(snapshot => {
    if (!snapshot.exists()) {
      cusAlert("alert", "No such table type:", table.type);
      return;
    }
    const tb = document.createElement("table");
    tableZone.appendChild(tb);
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.key != "ENname" && childSnapshot.key != "RUname") {
        var tr = document.createElement("tr");
        tb.appendChild(tr);
        if (childSnapshot.val().split(" / ").length == 2) {
          var th1 = document.createElement("th");
          th1.innerHTML = "<div>" + childSnapshot.val().split(" / ")[0] + "</div>";
          tr.appendChild(th1);
          var th2 = document.createElement("th");
          th2.innerHTML = "<div>" + childSnapshot.val().split(" / ")[1] + "</div>";
          tr.appendChild(th2);
        } else {
          var th1 = document.createElement("td");
          th1.innerHTML = "<div>" + childSnapshot.val() + "</div>";
          tr.appendChild(th1);
          var th2 = document.createElement("td");
          th2.innerHTML = `<span id="${childSnapshot.key}"></span>`;
          tr.appendChild(th2);
        }
      }
    });
  }).then(() => {
    get(ref(db, "users/" + table.owner + "/tables/" + table.type + "/" + table.name)).then(snapshot => {
      if (!snapshot.exists()) {
        cusAlert("alert", "No such user,", "or he hasn't \"" + table.name + "\" table.");
        tableZone.removeChild(tableZone.querySelector("table"));
        return;
      }
      snapshot.forEach(childSnapshot => {
        document.getElementById(childSnapshot.key).innerHTML = childSnapshot.val();
      });
    }).then(() => {
      checkOwner()
    });
  });
}

document.getElementById("save-btn").addEventListener("click", () => {
  tableZone.querySelectorAll("span").forEach(snapshot => {
    if (snapshot.innerHTML != null && snapshot.innerHTML != ""){
      console.log(snapshot.id + ": " + snapshot.innerHTML);
    }
  });
}, false);

addEventListenerList(tableZone.querySelectorAll("span"), "focusout", () => {
  alert(e.target.innerHTML)
});