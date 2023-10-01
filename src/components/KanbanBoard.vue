<template>
  <div class="mt-2">
    <v-container class="bg-surface-variant">
      <v-row>
        <v-col>
          <h4 class="font-weight-bold d-flex align-center justify-center">
            Progress
          </h4>
          <v-progress-linear
            class=""
            :model-value="calculatePercentage()"
            :height="25"
          >
            Done {{ done.length }} Out of {{ totalTasks }}</v-progress-linear
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col align="right">
          <v-btn
            class="mr-2"
            variant="outlined"
            size="small"
            prepend-icon="mdi:mdi-feature-search-outline"
          >
            SEARCH & FILTER
          </v-btn>

          <v-btn
            @click="showDialog = true"
            variant="outlined"
            size="small"
            prepend-icon="mdi:mdi-plus"
          >
            ADD TASK
          </v-btn>
          <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
              <v-card-title>Add Task</v-card-title>
              <v-card-text>
                <!-- Form fields for task input -->
                <v-text-field
                  v-model="newTask.title"
                  label="Title"
                ></v-text-field>
                <v-text-field
                  v-model="newTask.description"
                  label="Description"
                ></v-text-field>
                <v-file-input
                  v-model="newTask.fileInput"
                  clearable
                  label="File input"
                ></v-file-input>
                <v-text-field
                  type="date"
                  v-model="newTask.estimatedDate"
                  label="Select a Date"
                ></v-text-field>
                <v-text-field
                  type="time"
                  v-model="newTask.estimatedTime"
                  label="Estimated Time"
                ></v-text-field>
                <v-select
                  chips
                  label="Statuses"
                  v-model="newTask.selectedStatus"
                  :items="statuses"
                ></v-select>
              </v-card-text>

              <v-card-actions>
                <!-- Buttons for Save and Cancel -->
                <v-btn @click="addTask">Save</v-btn>
                <v-btn @click="cancelTask">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- <v-layout> -->
          <kanban-column
            class="text-center"
            title="Pending"
            :cards="pending"
          ></kanban-column>
        </v-col>
        <v-col>
          <kanban-column
            class="text-center"
            title="Processing"
            :cards="processing"
          ></kanban-column>
        </v-col>
        <v-col>
          <kanban-column
            class="text-center"
            title="Done"
            :cards="done"
          ></kanban-column>
        </v-col>
        <!-- </v-layout> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import KanbanColumn from "./KanbanColumn.vue";
import { useStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    KanbanColumn,
  },
  data() {
    const store = useStore();
    return {
      showDialog: false,
      newTask: {
        title: "",
        description: "",
        fileInput: [],
        estimatedDate: null,
        estimatedTime: null,
        selectedStatus: "Pending",
        id: 0,
      },
      totalTasks: 0,
      statuses: ["Pending", "Processing", "Done"],
      pending: store.pending,
      processing: store.processing,
      done: store.done,
    };
  },
  methods: {
    addTask() {
      const store = useStore();
      console.log("Store: ", store);
      console.log("New Task: ", this.newTask);
      const taskId =
        this.pending.length + this.processing.length + this.done.length + 1;
      this.newTask.id = taskId;
      store.addTask( ...this.newTask );

      // Clear/Reset the form and close the dialog
      this.newTask.title = "";
      this.newTask.description = "";
      this.newTask.fileInput = null;
      this.newTask.estimatedDate = null;
      this.newTask.estimatedTime = null;
      this.newTask.selectedStatus = "Pending";
      this.showDialog = false;
    },
    cancelTask() {
      // Clear/Reset the form and close the dialog
      this.newTask.title = "";
      this.newTask.description = "";
      this.newTask.fileInput = null;
      this.newTask.estimatedDate = null;
      this.newTask.estimatedTime = null;
      this.newTask.selectedStatus = "Pending";
      this.showDialog = false;
    },
    calculatePercentage() {
      this.totalTasks =
        this.pending.length + this.processing.length + this.done.length;
      const percentageOfCompletedTasks =
        (this.done.length / this.totalTasks) * 100;
      return percentageOfCompletedTasks;
    },
  },
});
</script>

<style scoped></style>
