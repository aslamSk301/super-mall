// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1_c47-k13SS0T5NytXM_93_cZsnGjBHo",
    authDomain: "emails-4bdef.firebaseapp.com",
    projectId: "emails-4bdef",
    storageBucket: "emails-4bdef.firebasestorage.app",
    messagingSenderId: "1093508111600",
    appId: "1:1093508111600:web:f8d6b44d8c0ee4a9a77635",
    measurementId: "G-14S2SLKB0P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };