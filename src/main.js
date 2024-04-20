const { createApp, ref } = Vue;
const { createRouter, createWebHistory } = VueRouter;

const router = createRouter({
    history: createWebHistory('/literacy/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: {
                template: 'a22aa'
            }
        },
        {
            path: '/a',
            name: 'homew',
            component: { template: 'aaa'}
        },
    ]
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