// Utilities
import { createPinia, defineStore } from 'pinia'


const pinia = createPinia()
export default pinia

export const useStore = defineStore('store', {
    state: () => ({
        pending: [],
        processing: [],
        done: [],
    }),
    actions: {
        addTask({state}, task) {
            console.log("Task: ", task)
            console.log("State: ", state)
            if (task.selectedStatus == "Pending") {
                state.pending.push({ ...task });
            } else if (task.selectedStatus == "Processing") {
                state.processing.push({ ...task });
            } else if (task.selectedStatus == "Done") {
                state.done.push({ ...task });
            }
        }
    }
})
