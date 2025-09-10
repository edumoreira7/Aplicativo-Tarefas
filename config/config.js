// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYBiu8as6rVdk6ZkXkq0z7OYnnymjumKg",
  authDomain: "aplicativo-tarefas-592bb.firebaseapp.com",
  databaseURL: "https://aplicativo-tarefas-592bb-default-rtdb.firebaseio.com",
  projectId: "aplicativo-tarefas-592bb",
  storageBucket: "aplicativo-tarefas-592bb.firebasestorage.app",
  messagingSenderId: "493881260588",
  appId: "1:493881260588:web:0988292a4139738ecf6f89",
  measurementId: "G-32P1Y94EXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);