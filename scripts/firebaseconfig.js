
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAfFQjUYl6JQqL4BK6nunepZy3JqUP1hSI",
    authDomain: "bloging-app-9133c.firebaseapp.com",
    projectId: "bloging-app-9133c",
    storageBucket: "bloging-app-9133c.firebasestorage.app",
    messagingSenderId: "412772963159",
    appId: "1:412772963159:web:420638c20410b06a09a412",
    measurementId: "G-S59X7D3PCB"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
