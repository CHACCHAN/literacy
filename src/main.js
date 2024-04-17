const { createApp, onMounted, onUpdated, watch, ref } = Vue;
const { createRouter, createWebHashHistory, useRouter } = VueRouter;

const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/about',
        component: about
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     const tl = gsap.timeline();
//     tl.to(".wrapper", {
//         duration: 0.5,
//         opacity: 0,
//         onComplete: () => {
//             next();
//         }
//     });
// });

const app = createApp({
    setup() {
        const pageName = ref(null);
        watch(() => router.currentRoute.value.path, () => {

        });

        onMounted(() => {
            document.title = pageName.value;
        });

        setTimeout(() => {
            pageName.value = 'test';
        }, 200);

        return {
            data: 'test'
        }
    }
});

app.use(router);
app.mount('#app');