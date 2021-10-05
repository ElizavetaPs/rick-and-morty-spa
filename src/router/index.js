import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
import Character from '../pages/Character.vue';
import Episode from '../pages/Episode.vue';

const routes = [
    { path: '/', component: Main, props: true },
    { path: '/character/:id', name: 'character', component: Character, props: true },
    { path: '/episode/:id', name: 'episode', component: Episode, props: true },
]

export default createRouter({
    history: createWebHistory(),
    routes
})