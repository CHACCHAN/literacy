import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getDatabase, ref, set, push, onChildAdded, remove, onChildRemoved } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

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
        this.database = getDatabase(this.firebaseApp);
        this.provider = new GoogleAuthProvider();
        this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.auth = getAuth();
        this.userList = null;
        this.syncUserData();
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

    async syncUserData() {
        this.getUser().then((result) => {
            if(result) {
                const dbRef = ref(this.database, 'users/' + result.uid);
                set(dbRef, {
                    uid: result.uid,
                    displayName: result.displayName,
                    photoURL: result.photoURL,
                });
    
                this.db_read('users/').then((result) => {
                    this.userList = result;
                });
            }
        });
    }

    async login() {
        await signInWithPopup(this.auth, this.provider)
        .then(() => setTimeout(() => window.location.reload(), 100))
        .catch((error) => console.log(error));
    }

    async logout() {
        await signOut(this.auth)
        .then(() => setTimeout(() => window.location.reload(), 100))
        .catch((error) => console.log(error));
    }

    async db_write(path, obj) {
        const dbRef = ref(this.database, path);
        
        await set(push(dbRef), obj);
    }

    async db_write_noUniq(path, obj) {
        const dbRef = ref(this.database, path);
        
        await set(dbRef, obj);
    }

    async db_read(path) {
        const dbRef = ref(this.database, path);

        return await new Promise((resolve, reject) => {
            const snapshots = new Array();
            onChildAdded(dbRef, (snapshot) => {
                snapshots.push(snapshot.val());
                resolve(snapshots);
            }, (error) => {
                reject(error);
            });
        });
    }

    // スレッドの取得
    async db_realtime_thread_lists(options) {
        const dbRef = ref(this.database, options.path);
        const parentNode = document.getElementById(options.parentID);

        onChildAdded(dbRef, (snapshot) => {
            var element = document.createElement('div');
            var content = document.createTextNode('# ' + snapshot.val().title);
            element.setAttribute('id', 'threadContent');
            element.setAttribute('onclick', 'db_open_message("chatListView", "chatView", "' + snapshot.key + '")');
            element.classList.add('card', 'card-body', 'text-bg-dark', 'border-light', 'mb-3', 'text-truncate', 'scale-up');
            element.style.cursor = 'pointer';
            element.appendChild(content);
            parentNode.insertBefore(element, parentNode.firstChild);
        });
    }

    // メッセージの取得
    async db_realtime_messages(options) {
        const dbRef = ref(this.database, options.path);
        const parentNode = document.getElementById(options.parentID);
        parentNode.innerHTML = '';

        this.getUser().then((result) => {
            onChildAdded(dbRef, (snapshot) => {
                if(snapshot.val().uid === result.uid) {
                    var myElement = document.createElement('div');

                    myElement.innerHTML =
                        `
                            <div class="d-flex align-items-top justify-content-end mb-3">
                                <div class="me-2">
                                    <div class="text-end">${result.displayName}</div>
                                    <div class="card card-body text-bg-success p-1">
                                        ${snapshot.val().text}
                                    </div>
                                </div>
                                <img src="${result.photoURL}" width="50px" height="50px" class="rounded-circle" />
                            </div>
                        `;
                    
                    setTimeout(() => parentNode.appendChild(myElement), 100);
                } else {
                    this.checkUser(snapshot.val(), this.userList).then((result) => {
                        var publicElement = document.createElement('div');

                        publicElement.innerHTML =
                            `
                                <div class="d-flex align-items-top justify-content-start mb-3">
                                <img src="${result.photoURL}" width="50px" height="50px" class="rounded-circle" />
                                    <div class="ms-2">
                                        <div class="text-start">${result.displayName}</div>
                                        <div class="card card-body text-bg-secondary p-1">
                                            ${snapshot.val().text}
                                        </div>
                                    </div>
                                </div>
                            `;

                        setTimeout(() => parentNode.appendChild(publicElement), 100);
                    });
                }
            });
        });
    }

    async checkUser(current, target) {
        return await new Promise((resolve, reject) => {
            for(let i = 0; i < target.length; i++) {
                if(target[i].uid === current.uid) {
                    resolve(target[i]);
                }
            }
        });
    }
}

export default firebase;