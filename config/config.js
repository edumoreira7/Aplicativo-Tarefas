// config.js
import firebase from "firebase";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYBiu8as6rVdk6ZkXkq0z7OYnnymjumKg",
  authDomain: "aplicativo-tarefas-592bb.firebaseapp.com",
  databaseURL: "https://aplicativo-tarefas-592bb-default-rtdb.firebaseio.com",
  projectId: "aplicativo-tarefas-592bb",
  storageBucket: "aplicativo-tarefas-592bb.appspot.com",
  messagingSenderId: "493881260588",
  appId: "1:493881260588:web:0988292a4139738ecf6f89"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
