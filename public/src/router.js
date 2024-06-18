import { createRouter, createWebHashHistory } from 'vue-router';
import BaseComponent from './components/BaseComponent.vue';
import HomeComponent from './components/HomeComponent.vue'
import FavouriteComponent from './components/FavouriteComponent.vue'
import GeneratorComponent from './components/GeneratorComponent.vue'

const routes = [
    { path: '/', component: HomeComponent },
    { path: '/base', component: BaseComponent },
    { path: '/favourite', component: FavouriteComponent },
    { path: '/generator', component: GeneratorComponent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
