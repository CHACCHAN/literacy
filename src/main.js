const { createApp, ref } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

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

        return {
            data: 'test'
        }
    }
});

app.use(router);
app.mount('#app');