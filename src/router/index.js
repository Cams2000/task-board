// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Kanban Board",

        component: () => import("@/components/KanbanBoard.vue"),
      },
    ],
  },
  {
    path: "/:id",
    name: "Task",
    component: () => import("@/components/Task.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;