import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update } from 'firebase/database';

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
  "Save", "Сохранить",
);

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
      document.getElementById("user-tables-zone").appendChild(newMEl);
      childSnapshot.forEach(cChildSnapshot => {
        var newEl = document.createElement("p");
        newEl.id = childSnapshot.key;
        newEl.className = "link";
        newEl.style.color = "var(--second-text-color)";
        newEl.innerHTML = cChildSnapshot.key;
        document.getElementById("user-tables-zone").appendChild(newEl);
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
  get(ref(db, "tables")).then(snapshot => {
    snapshot.forEach(childSnapshot => {
      var newEl = document.createElement("p");
      newEl.id = childSnapshot.key;
      newEl.className = "link";
      newEl.style.color = "var(--second-text-color)";
      newEl.innerHTML = childSnapshot.child("ENname").val() + "/" + childSnapshot.child("RUname").val();
      document.getElementById("tables-types-zone").appendChild(newEl);
      newEl.addEventListener("click", () => {
        newEl.style.color = "var(--primary-text-color)";
        setSearch(user.id, newEl.id, value.toLowerCase());
      }, false);
    });
  });
}, false);
function checkEnter(e) {
  if (e.keyCode == "13") {
    e.preventDefault();
    return e.target.innerHTML;
  } else return false;
}

function setSearch(owner, type, name) {
  location.search = "owner=" + owner + "&type=" + type  + "&name=" + name;
}

window.addEventListener("load", async () => {
  if (location.search == "") {
    if (user.id != null) {
      document.getElementById("user-input").innerHTML = user.id;
    }
    return;
  }
  const urlParams = new URLSearchParams(location.search);
  if (urlParams.get("owner") != null && urlParams.get("type") != null && urlParams.get("name") != null) {
    table.owner = urlParams.get("owner");
    table.type = urlParams.get("type");
    table.name = urlParams.get("name");
    console.log(table);
  } else cusAlert("alert", "Missing parameter(s),", "in url must be 3 parameters (owner, type and name).");
}, false)


// function showTable(tbshow) {
//     const cont = document.getElementById("tb-choose");
//     var tbhide;
//     if (tbshow == 1) {
//         tbhide = 2;
//         cont.firstElementChild.style.color = "#008000";
//         cont.firstElementChild.style.border = "1px solid #008000";
//         cont.lastElementChild.style.color = "#333";
//         cont.lastElementChild.style.border = "1px solid #7a7e85";
//         window.if1tb = true;
//     } else {
//         tbhide = 1;
//         cont.firstElementChild.style.color = "#333";
//         cont.firstElementChild.style.border = "1px solid #7a7e85";
//         cont.lastElementChild.style.color = "#008000";
//         cont.lastElementChild.style.border = "1px solid #008000";
//         window.if1tb = false;
//     }
//     document.getElementById("table-" + tbhide).style.display = 'none';
//     document.getElementById("table-" + tbshow).style.display = 'block';
// }
// function enterValues(tbn, tname) {
//     var j = 0;
//     if (tbn > 1) {j = 72;}
//     async function eve() {
//         const promises = [];
//         for (var i = 0; i < 71; i++) {
//             promises.push(getTable(tbn, tname, i));
//         }
//         const tableValues = await Promise.all(promises);
//         for(const [i, val] of tableValues.entries()) {
//             if (val !== null) {
//                 document.getElementById(i + j).value = val;
//                 document.getElementById(i + j).style.color = "#008000";
//             } else {
//                 document.getElementById(i + j).value = "";
//             }
//         }
//     }
//     eve();
//     showTable(tbn);
//     return true;
// }
// function sendName(e) {
//     const tname = document.getElementById("name").innerHTML;
//     if (e.keyCode == "13") {
//         event.preventDefault();
//         if (checkuname() == false) {
//             alert("Вы не вошли!");
//             return false;
//         }
//         if (tname !== '') {
//             if (typeof(if1tb) != 'undefined') {
//                 if (window.confirm('Подключиться к проекту "' + tname + '" ?\nЕсли открыт проект он не сохранится!')) {  
//                         if (if1tb) {
//                             var tbn = 1;
//                         } else {
//                             var tbn = 2;
//                         }
//                     enterValues(tbn, tname);
//                 } else {
//                     return false;
//                 }
//             } else {
//                 alert("Выберите тип!\nХочу или Могу.")
//                 return false;
//             }
//         } else {
//             alert("Поле не может быть пустым!");
//             return false;
//         }
//     }
// }
// function sendValues(tbn) {
//     if (checklog() == false) {
//         alert("Вы не имеете права редактирования!");
//         return false;
//     }
//     const tname = document.getElementById("name").innerHTML;
//     if (tname !== '') {
//         if (window.confirm('Сохранить изменения?\nИзмененные значениия будут заменены!')) {
//             var j = 0;
//             if (tbn > 1) {j = 72;}
//             for (var i = 0; i < 71; i++) {
//                 if (document.getElementById(i + j).value !== '') {
//                     writeTable(tbn, tname, i, document.getElementById(i + j).value);
//                     document.getElementById(i + j).style.color = "#008000";
//                 }
//             }
//             return true;
//         } else {
//             return false;
//         }
//     } else {
//         alert("Вы не подсоединены к проекту!");
//         return false;
//     }
// }
// function sendValue(tbn, iid) {
//     if (checklog() == false) {
//         alert("Вы не имеете права редактирования!");
//         return false;
//     }
//     var j = iid;
//     if (tbn > 1) j -= 72;
//     const checked = document.getElementById("check").checked;
//     const tname = document.getElementById("name").innerHTML;
//     const ta = document.getElementById(iid);
//     if (checked == true && ta.value !== '') {
//         if (tname == '') {
//             alert("Вы не ввели имя проекта!");
//             return false;
//         }
//         writeTable(tbn, tname, j, ta.value);
//         ta.style.color = "#008000";
//         return true;
//     }
//     return false;
// }
// function check() {
//     const check = document.getElementById("check");
//     if (check.checked == true) {
//         check.checked = false;
//     } else {
//         check.checked = true;
//     }
// }
// function newTbel(tbn, tname) {
//     const newTb = document.getElementById("tb-" + tbn);
//     const newEl = document.createElement("button");
//     newEl.innerHTML = tname;
//     newEl.onclick = function(){openTable(tbn, tname);};
//     newEl.setAttribute('type', 'button');
//     newTb.firstChild.style.display = "block";
//     newTb.appendChild(newEl);
// }
// window.newTbel = newTbel;

// function rAllChilds(id) {
//     const el = document.getElementById(id);
//     while (el.childElementCount != 1) el.removeChild(el.lastChild);
// }
// window.rAllChilds = rAllChilds;

// function openTable(tbn, tname) {
//     enterValues(tbn, tname);
//     document.getElementById("name").innerHTML = tname;
// }

// var row, table = 0;
// function showSrch(id) {
//     const srch = document.getElementById("srch");
//     const label = document.getElementById("kWLabel");
//     const input = document.getElementById("kWInput");
//     const text = "Ключевые слова для поля ";
//     if (id.substring(4) <= 71) {
//         table = 1;
//         row = id.substring(4);
//     } else {
//         table = 2;
//         row = id.substring(4) - 72;
//     }
//     if (srch.style.display != "block") {
//         srch.style.display = "block";
//     } else if (label.innerHTML == text + row) {
//         srch.style.display = "none";
//     }
//     if (label.innerHTML != text + row) {
//         label.innerHTML = text + row;
//         input.value = table + "." + row;
//     }
// }
// function srchMenu(keys) {
//     if (table == 0) return false;
//     alert(`${keys}\n${table}\n${row}`);
// }