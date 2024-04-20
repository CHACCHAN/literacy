const { createApp, ref, onMounted } = Vue;
const { createRouter, createWebHistory } = VueRouter;

export const fetchTemplate = async (pathName) => {
    const response = await fetch(location.origin + location.pathname + 'src/views/' + pathName);
    return await response.text();
}

const router = createRouter({
    history: createWebHistory(location.pathname),
    routes: [
        {
            path: '/',
            name: 'home',
            component: { template: await fetchTemplate('home.html') }
        },
        {
            path: '/about',
            name: 'about',
            component: { template: await fetchTemplate('about.html') }
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