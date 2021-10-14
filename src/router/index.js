import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
// import Character from '../pages/Character.vue';
// import Episode from '../pages/Episode.vue';

const routes = [
    { path: '/', name: 'index', component: Main, props: true },
    { path: '/character/:id', name: 'character', component: () => import('../pages/Character.vue'), props: true },
    { path: '/episode/:id', name: 'episode', component: () => import('../pages/Episode.vue'), props: true },
]

export default createRouter({
    history: createWebHistory(),
    routes
})