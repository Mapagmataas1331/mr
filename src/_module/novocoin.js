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

trans_arr.push(
  "Transactions:", "Транзакции:",
);

window.onLogin = async () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("start").style.display = "block";

  const transactions = document.getElementById("transactions");
  document.getElementById("username").innerHTML = user.name;
  document.getElementById("amount").innerHTML = user.vid;
  for (var i = 0; i < 100; i++) {
    var newEl = document.createElement("p");
    newEl.className = "transaction";
    newEl.title = ". . .";
    newEl.innerHTML = "00.00 00:00 (TEST " + i + ")<br>you -> Somebody [00]";
    transactions.appendChild(newEl);
  }
}