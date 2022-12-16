import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

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

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('1323'),

  isTokenAutoRefreshEnabled: true
});

const app = initializeApp(firebaseConfig);

function writeTableName(tname) {
  const db = getDatabase();
  const reference = ref(db, 'table/' + tname);

  set(reference, {
    table_name: tname
  });
}