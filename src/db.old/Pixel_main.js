const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { getDatabase, ref, set, get, update, child } = require('firebase/database');

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
const analytics = getAnalytics(app);
const db = getDatabase(app);