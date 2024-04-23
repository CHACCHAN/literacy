import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { myAnimations } from './gsap/animate.js';

const { createApp, ref, watch, onMounted } = Vue;
const { createRouter, createWebHistory } = VueRouter;
const isProgressBar = ref(false);
const isUserData = ref(null);

gsap.config({
    nullTargetWarn: false
});

export const fetchTemplate = async (pathName) => {
    const response = await fetch(location.origin + location.pathname + 'src/' + pathName);
    return await response.text();
}

const firebaseConfig = {
    apiKey: "AIzaSyDpEN9czLrXdURlxdcrpikZFYawLGV1fYM",
    authDomain: "cit-github-page.firebaseapp.com",
    projectId: "cit-github-page",
    storageBucket: "cit-github-page.appspot.com",
    messagingSenderId: "364095826489",
    appId: "1:364095826489:web:b20b75b553d1753e94bbe8"
};

const firebase = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();

const login = async () => {
    var response;
    await signInWithPopup(auth, provider).then((result) => {
        response = result;
    }).catch((error) => {
        response = error;
    });

    isUserData.value = response;
}

const logout = async () => {
    signOut(auth);
}

const progressBar = () => {
    var bar = new ProgressBar.Line(container, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        from: {color: '#FFEA82'},
        to: {color: '#ED6A5A'},
        step: (state, circle) => {
            circle.path.setAttribute('stroke', state.color);
        }
    });

    bar.animate(1.0);
}

const router = createRouter({
    history: createWebHistory(location.pathname),
    routes: [
        {
            path: '/',
            name: 'home',
            call: 'ホーム',
            component: { template: await fetchTemplate('views/home.html') }
        },
        {
            path: '/about',
            name: 'about',
            call: '私について',
            component: { template: await fetchTemplate('views/about.html') }
        },
        {
            path: '/photo',
            name: 'photo',
            call: '写真',
            component: { template: 'asadaaa'}
        },
    ]
});

router.beforeEach((to, from, next) => {
    const tl = gsap.timeline();
    tl.to('.wrapper', {
        duration: 1.4,
        opacity: 0.5,
        onStart: () => {
            document.getElementById('progressBar').innerHTML = '<div id="container" class="position-fixed z-3 w-100" style="height: 5px;top: -11px;"></div>';
            progressBar();
            isProgressBar.value = false;
        },
        onComplete: () => {
            next();
            document.getElementById('container').remove();
            isProgressBar.value = true;
        }
    }).to(".wrapper", {
        duration: 0.5,
        opacity: 1
    }, 1);
});

const app = createApp({
    setup() {
        const headerRouteFlag = ref([
            true, false, false,
        ]);

        onMounted(() => {
            getRouting();
            // 初回アニメーションコールバック
            setTimeout(() => {
                runAnimation();
            }, 1400);

            // login();
            // logout();
        });

        watch(() => router.currentRoute.value.path, () => {
            getRouting();
        });

        const getRouting = () => {
            runAnimation();
            for(let i = 0; i < router.options.routes.length; i++) {
                if(router.options.routes[i].path == location.pathname.replace('/literacy', '')) {
                    document.title = router.options.routes[i].call;
                }
            }
        }

        const runAnimation = () => {
            Object.values(myAnimations).forEach(fn => fn());
        }

        const headerRouteFlagChanger = (id) => {
            for(let i = 0; i < headerRouteFlag.value.length; i++) {
                if(i === id) {
                    headerRouteFlag.value[i] = true;
                } else {
                    headerRouteFlag.value[i] = false;
                }
            }
        }

        return {
            headerRouteFlag,
            headerRouteFlagChanger,
            isProgressBar,
        }
    }
});

app.use(router);
app.mount('#app');