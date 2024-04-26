import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

class firebase {
    constructor() {
        this.firebaseApp = initializeApp({
            apiKey: "AIzaSyDpEN9czLrXdURlxdcrpikZFYawLGV1fYM",
            authDomain: "cit-github-page.firebaseapp.com",
            projectId: "cit-github-page",
            storageBucket: "cit-github-page.appspot.com",
            messagingSenderId: "364095826489",
            appId: "1:364095826489:web:b20b75b553d1753e94bbe8"
        });
        this.database = getDatabase();
        this.provider = new GoogleAuthProvider();
        this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.auth = getAuth();
    }

    async getUser() {
        return await new Promise((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if(user)
                    resolve(user);
                else
                    reject(false);
            });
        });
    }

    async login() {
        await signInWithPopup(this.auth, this.provider);
        return await this.getUser();
    }

    async logout() {
        await signOut(this.auth)
        .then(() => setTimeout(() => window.location.reload(), 100))
        .catch((error) => console.log(error));
    }

    async db_write(path, obj) {
        await set(ref(this.database, path), obj);
    }
}

export default firebase;