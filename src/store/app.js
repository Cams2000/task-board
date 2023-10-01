// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    pending: [],
    processing: [],
    done: [],
  }),
  mutations: {
    addTask(state, task){
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
