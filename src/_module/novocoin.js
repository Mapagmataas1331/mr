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
  "Transactions:", "Транзакции:",
  "Waiting for login...", "Ожидание авторизации...",
  "If you are not loged in, login on <a class=\"link\" href=\"https://ma.kak.si/account\">account page</a>.", "Если вы не авторизированы, войдите на <a class=\"link\" href=\"https://ma.kak.si/account\">странице - аккаунт</a>.",
  "It looks like you haven't used Novocoin yet,", "Похоже вам еще не доводилось использовать Новокоин,",
  "Create a novocoin account.", "Создать аккаунт Новокоина.",
);

window.onLogin = async () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("start").style.display = "block";

  const transactions = document.getElementById("transactions");
  document.getElementById("username").innerHTML = user.name;
  document.getElementById("amount").innerHTML = 10000;
  for (var i = 0; i < 100; i++) {
    var newEl = document.createElement("p");
    newEl.className = "transaction";
    newEl.title = ". . .";
    newEl.innerHTML = "00.00 00:00 (TEST " + i + ")<br>you -> Somebody [00]";
    transactions.appendChild(newEl);
  }
}

document.getElementById("create").addEventListener("click", () => {
  document.getElementById("start").style.display = "none";
  document.getElementById("block").style.display = "none";
}, false);