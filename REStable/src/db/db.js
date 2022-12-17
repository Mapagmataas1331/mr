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

function writeTable(tname, trowid, trowvalue) {
  update(ref(db, `table_name/${tname}`), {
    ["table_row_" + String("0" + trowid).slice(-2)]: trowvalue
  });
}
window.writeTable = writeTable;

function getTable(tname, trowid) {
  return get(ref(db, `table_name/${tname}/table_row_${String("0" + trowid).slice(-2)}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    }
  });
}
window.getTable = getTable;
