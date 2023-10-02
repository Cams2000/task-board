<template>
  <v-card outlined class="pa-4">
    <h3 class="font-weight-bold d-flex align-center justify-center">
      Progress
    </h3>
    <v-progress-linear
      :model-value="calculatePercentage()"
      :height="25"
      color="green-lighten-2"
      class="bg-green-lighten-4"
    >
      <p style="color: black">
        {{ Math.floor(calculatePercentage()) }}% (Done
        {{
          tasks.filter((task) => task.selectedStatus === statuses.DONE).length
        }}
        Out of {{ totalTasks }})
      </p>
    </v-progress-linear>
  </v-card>
</template>
<script>
import { useStore } from "@/store";
import { STATUSES } from "@/constants/index";
const store = useStore();
export default {
  data() {
    return {
      statuses: STATUSES,
      tasks: store.tasks,
      totalTasks: 0,
    };
  },
  methods: {
    calculatePercentage() {
      this.totalTasks = this.tasks.length;
      const doneTasks = this.tasks.filter((task) => {
        return task.selectedStatus === STATUSES.DONE;
      });
      if (this.totalTasks == 0) {
        return 0;
      }
      const percentageOfCompletedTasks =
        (doneTasks.length / this.totalTasks) * 100;
      return percentageOfCompletedTasks;
    },
  },
};
</script>
