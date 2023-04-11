const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { getDatabase, ref, set, get, update, child } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyCPdKPTedeFiYCAJvypIgTR3dFxq17yKlc",
  authDomain: "ma-d0t.firebaseapp.com",
  databaseURL: "https://ma-d0t-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ma-d0t",
  storageBucket: "ma-d0t.appspot.com",
  messagingSenderId: "805036478851",
  appId: "1:805036478851:web:8c7339f74c4c1bbc8ce6b6",
  measurementId: "G-HNT2YBHY27"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// const { initializeApp } = require('firebase/app');
// const { getAnalytics } = require('firebase/analytics');
// const { getDatabase, ref, set, get, update, child } = require('firebase/database');

// const firebaseConfig = {
//   apiKey: "AIzaSyCE99ycZW0noggD6NnTaa-tu5FYio0OWpE",
//   authDomain: "webtest-db.firebaseapp.com",
//   databaseURL: "https://webtest-db-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "webtest-db",
//   storageBucket: "webtest-db.appspot.com",
//   messagingSenderId: "977282304261",
//   appId: "1:977282304261:web:180f2b5ef5eaa234900f6c",
//   measurementId: "G-MM1VCV4545"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getDatabase(app);

const fpPromise = import('@fingerprintjs/fingerprintjs')
.then(FingerprintJS => FingerprintJS.load());

fpPromise
.then(fp => fp.get())
.then(result => {
  const visitorId = result.visitorId
  console.log("\n- Visitor identifier:\n" + visitorId + "\n\n");
});