import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";

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
var uname = "";
var nolog = false;

function logreg(login, pass) {
  if (pass == "") {
    get(ref(db, `users/${login}/password`)).then((snapshot) => {
      if (snapshot.exists()) {
        nolog = true;
        uname = login;
        alert(`Вы подключены к проектам пользователя: "${uname}"\nБез права редактирования!`);
        return true;
      } else {
        alert("Нет такого пользователя!");
        return false;
      }
    });
    return false;
  }
  get(ref(db, `users/${login}/password`)).then((snapshot) => {
    if (snapshot.exists()) {
      if (pass == snapshot.val()) {
        uname = login;
        nolog = false;
        alert(`Успешно!`);
        return true;
      } else {
        alert(`Пароль не подходит!`);
        return false;
      }
    } else {
      set(ref(db, `users/${login}`), {
        password: pass
      });
      uname = login;
      nolog = false;
      alert(`Учетная запись создана!`);
      return true;
    }
  });
  return false;
}
window.logreg = logreg;

function writeTable(tbn, tname, trowid, trowvalue) {
  if (uname == "") {
    alert("Вы не вошли!");
    return false;
  } else if (nolog == true) {
    alert("Вы не имеете права редактирования!");
    return false;
  } else {
    update(ref(db, `users/${uname}/table_${tbn}/${tname}`), {
      ["table_row_" + String("0" + trowid).slice(-2)]: trowvalue
    });
    return true;
  }
}
window.writeTable = writeTable;

function getTable(tbn, tname, trowid) {
  if (uname == "") {
    alert("Вы не вошли!");
    return false;
  }
  return get(ref(db, `users/${uname}/table_${tbn}/${tname}/table_row_${String("0" + trowid).slice(-2)}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
}
window.getTable = getTable;

function checklog() {
  if (nolog == false) {
    return true;
  } else {
    return false;
  }
}
window.checklog = checklog;