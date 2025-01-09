// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyBMJa3ThjodgR0d06Dns2ZKos1UR9QEzLw",
    authDomain: "estacionamento1-ab435.firebaseapp.com",
    databaseURL: "https://estacionamento1-ab435-default-rtdb.firebaseio.com",
    projectId: "estacionamento1-ab435",
    storageBucket: "estacionamento1-ab435.appspot.com",
    messagingSenderId: "734820600394",
    appId: "1:734820600394:web:5db50702d23f13d96834b3",
    measurementId: "G-RMKJPW91S6"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set, onValue };
