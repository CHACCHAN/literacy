import { myAnimations } from './gsap/animate.js';

const { createApp, ref, watch, onMounted } = Vue;
const { createRouter, createWebHistory } = VueRouter;
const isProgressBar = ref(false);

gsap.config({
    nullTargetWarn: false
});

export const fetchTemplate = async (pathName) => {
    const response = await fetch(location.origin + location.pathname + 'src/' + pathName);
    return await response.text();
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
            document.getElementById('progressBar').innerHTML = '<div id="container" class="position-fixed w-100" style="height: 5px;top: -11px;"></div>';
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
            isProgressBar
        }
    }
});

app.use(router);
app.mount('#app');