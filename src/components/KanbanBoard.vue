<template>
  <div class="mt-2">
    <v-container class="board">
      <v-row class="">
        <v-col> <board-progress-bar /></v-col>
      </v-row>
      <v-row>
        <v-col align="right">
          <v-btn
            @click="showFilterDialog = true"
            class="mr-2"
            variant="outlined"
            size="small"
            prepend-icon="mdi:mdi-feature-search-outline"
          >
            SEARCH & FILTER
          </v-btn>

          <v-dialog v-model="showFilterDialog" max-width="500px">
            <v-card>
              <v-card-title>Filter Tasks</v-card-title>
              <v-card-text>
                <v-text-field
                  class="mb-4"
                  v-model="filter.searchWord"
                  label="Search"
                  hide-details
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <!-- Buttons for Apply and Cancel -->
                <v-btn @click="filterTask">Apply</v-btn>
                <v-btn @click="resetFilter">Reset</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn
            @click="showAddTaskDialog = true"
            variant="outlined"
            size="small"
            prepend-icon="mdi:mdi-plus"
          >
            ADD TASK
          </v-btn>

          <v-dialog v-model="showAddTaskDialog" max-width="500px">
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
                <v-btn @click.prevent="addTask">Save</v-btn>
                <v-btn @click="closeDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="(status, index) in statusOptions" :key="index">
          <kanban-column
            class="text-center"
            :title="status.title"
          ></kanban-column>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import KanbanColumn from "./KanbanColumn.vue";
import BoardProgressBar from "./BoardProgressBar.vue";
import { useStore } from "@/store";
import { STATUSES, STATUS_OPTIONS, STATUSES_ARRAY } from "@/constants/index";
const store = useStore();

export default {
  components: {
    KanbanColumn,
    BoardProgressBar,
  },
  data() {
    return {
      STATUSES,
      statusOptions: STATUS_OPTIONS,
      showAddTaskDialog: false,
      showFilterDialog: false,
      editDialog: false,
      newTask: {
        title: "",
        description: "",
        addComment: "",
        fileInput: [],
        estimatedDate: null,
        estimatedTime: null,
        selectedStatus: STATUSES.PENDING,
        id: 0,
      },
      filter: {
        searchWord: "",
        filteredDate: null,
        filteredTime: null,
      },
      statuses: STATUSES_ARRAY,
      tasks: store.tasks
    };
  },
  methods: {
    addTask() {
      const taskId = this.tasks.length + 1;
      this.newTask.id = taskId;
      store.addTask(this.newTask);

      // Clear/Reset the form and close the dialog
      this.newTask.title = "";
      this.newTask.description = "";
      this.newTask.fileInput = null;
      this.newTask.estimatedDate = null;
      this.newTask.estimatedTime = null;
      this.newTask.selectedStatus = STATUSES.PENDING;
      this.showAddTaskDialog = false;
    },
    closeDialog() {
      // Clear/Reset the form and close the dialog
      this.newTask.title = "";
      this.newTask.description = "";
      this.newTask.fileInput = null;
      this.newTask.estimatedDate = null;
      this.newTask.estimatedTime = null;
      this.newTask.selectedStatus = STATUSES.PENDING;
      this.showAddTaskDialog = false;

      this.filter.searchWord = "";
      this.filter.filteredDate = null;
      this.filter.filteredTime = null;
      this.showFilterDialog = false;
    },
    filterTask() {
      store.applyFilter(this.filter.searchWord);
      this.filter.searchWord = "";
      this.showFilterDialog = false;
    },
    resetFilter() {
      store.resetFilter();
      this.closeDialog()
    }
  },
};
</script>

<style scoped>
.board {
  background-color: #e8ebec9a;
}
</style>
