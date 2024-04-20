const { createApp, ref, onMounted } = Vue;
const { createRouter, createWebHistory } = VueRouter;

const router = createRouter({
    history: createWebHistory('/literacy/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/about',
            name: 'about',
            component: about
        },
        {
            path: '/photo',
            name: 'photo',
            component: { template: 'asadaaa'}
        },
    ]
});

const app = createApp({
    setup() {
        onMounted(() => {

        });

        return {
            data: 'test'
        }
    }
});

app.use(router);
app.mount('#app');