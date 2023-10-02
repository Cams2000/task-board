// Utilities
import { createPinia, defineStore } from "pinia";
import { STATUSES } from "@/constants/index";
import { tasks } from "../../input"

const pinia = createPinia();
export default pinia;

export const useStore = defineStore("store", {
    state: () => ({
        tasks,
    }),
    actions: {
        addTask(task) {
            this.tasks.push({ ...task });
        },
        applyFilter(searchWord) {
            this.tasks = this.tasks.map((task) => {
                task.isHighlighted = task.description.includes(searchWord) || task.title.includes(searchWord);
                return task;
            });
        },
        resetFilter() {
            this.tasks = this.tasks.map((task) => {
                task.isHighlighted = false
                return task;
            });
        },
        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId)
        },
        moveTaskForward(id) {
            const task = this.tasks.find(item => item.id === id)

            switch (task.selectedStatus) {
                case STATUSES.PENDING: {
                    return task.selectedStatus = STATUSES.PROCESSING
                }
                case STATUSES.PROCESSING: {
                    return task.selectedStatus = STATUSES.DONE
                }
                case STATUSES.DONE: {
                    return task.selectedStatus = STATUSES.PENDING
                }
            }
        },
        updateTasks(tasks) {
            this.tasks = tasks
        },
        editTask(taskId, updatedFields) {
            const taskIndex = this.tasks.findIndex(
                (card) => card.id === taskId
            );

            if (taskIndex !== -1) {
                const targetEditTask = this.tasks[taskIndex];
                targetEditTask.title = updatedFields.title;
                targetEditTask.description = updatedFields.description;
                this.tasks.splice(taskIndex, 1, targetEditTask);

            }
        }
    },
});