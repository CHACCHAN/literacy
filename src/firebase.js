const { initializeApp } = 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
const { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, signOut, onAuthStateChanged } = 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDpEN9czLrXdURlxdcrpikZFYawLGV1fYM",
    authDomain: "cit-github-page.firebaseapp.com",
    projectId: "cit-github-page",
    storageBucket: "cit-github-page.appspot.com",
    messagingSenderId: "364095826489",
    appId: "1:364095826489:web:b20b75b553d1753e94bbe8"
};

const firebase = initializeApp(firebaseConfig);

// Google
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();

// Login
function login() {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}