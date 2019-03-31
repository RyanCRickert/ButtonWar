import * as firebase from "firebase";

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };

const config = {
  apiKey: "AIzaSyD3pIVSCZWokPR7ZOoWeqYYo_CmHThKOAQ",
  authDomain: "clicker-e30a0.firebaseapp.com",
  databaseURL: "https://clicker-e30a0.firebaseio.com",
  projectId: "clicker-e30a0",
  storageBucket: "clicker-e30a0.appspot.com",
  messagingSenderId: "450656688963"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { database as default, firebase, googleAuthProvider };