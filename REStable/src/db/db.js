import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

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

function writeTable(tname, trowid, trowvalue) {
  const db = getDatabase();
  set(ref(db, 'table_name/' + tname + '/table_row_' + trowid), {
    table_row_value: trowvalue
  });
}
window.writeTable = writeTable;

function getTable(tname, trowid) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, 'table_name/' + tname)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return "null";
  });
}
window.getTable = getTable;
