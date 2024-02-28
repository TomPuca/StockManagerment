// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyDl0oKQRCOHexa-EloSX_pJFN-lkSqibtc",
  authDomain: "stockrealtime-5c049.firebaseapp.com",
  databaseURL: "https://stockrealtime-5c049.firebaseio.com",
  projectId: "stockrealtime-5c049",
  storageBucket: "stockrealtime-5c049.appspot.com",
  messagingSenderId: "144010414262",
  appId: "1:144010414262:web:322dbb3aa4889756587e17",
  measurementId: "G-J2YJH55K7K",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// const StockRef = db.collection("Stocks");
let now = new Date();
let NowYear = now.getFullYear();

export const StockRef = db.collection("Stocks" + NowYear);
export default db;
