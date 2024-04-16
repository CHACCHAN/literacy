const { createApp, ref } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/a',
        name: 'homew',
        component: { template: 'aaa'}
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp({
    setup() {
        return {
            data: 'test'
        }
    }
});

app.use(router);
app.mount('#app');