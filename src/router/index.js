import { createWebHistory, createRouter } from "vue-router";
import Restaurant from "@/views/Restaurant.vue";
import Worker from "@/views/Worker.vue";
const routes = [
    {
        path: "/",
        name: "restaurant",
        component: Restaurant,
    },
    {
        path: "/restaurant/:id",
        name: "restaurant.edit",
        component: () => import("@/views/RestaurantEdit.vue"),
        props: true 
    },
    {
        path: "/restaurant/add",
        name: "restaurant.add",
        component: () => import("@/views/RestaurantAdd.vue"),
        props: true 
    },
    {
        path: "/",
        name: "worker",
        component: Worker,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/worker/:id",
        name: "worker.edit",
        component: () => import("@/views/WorkerEdit.vue"),
        props: true
    },
    {
        path: "/worker/add",
        name: "worker.add",
        component: () => import("@/views/WorkerAdd.vue"),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;