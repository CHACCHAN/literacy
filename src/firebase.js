import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpEN9czLrXdURlxdcrpikZFYawLGV1fYM",
    authDomain: "cit-github-page.firebaseapp.com",
    projectId: "cit-github-page",
    storageBucket: "cit-github-page.appspot.com",
    messagingSenderId: "364095826489",
    appId: "1:364095826489:web:b20b75b553d1753e94bbe8"
};

const firebase = initializeApp(firebaseConfig);

const googleLogin = async() => {
    await google.addScope('https://www.googleapis.com/auth/contacts.readonly');
}

const emailLogin = async(email, password) => {
    try {
        await signInWithEmailAndPassword(email, password);
    } catch(error) {
        console.log(error);
    }    
}

const logout = async() => {
    try {
        await signOut(auth);
    } catch(error) {
        console.log(error);
    }
}