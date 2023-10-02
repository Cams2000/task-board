<template>
  <div draggable="false" @dragover.prevent @drop.stop="moveTask($event)">
    <v-card class="mb-3">
      <v-card-title>{{ title }}</v-card-title>
    </v-card>
    <template v-if="cards.length">
      <v-card
        class="mb-5"
        v-for="card in cards"
        :key="card.id"
        :color="card.isHighlighted ? 'yellow' : 'white'"
        draggable="true"
        @dragstart="pickupTask($event, card.id)"
        @drop.stop="moveTask($event, card.id)"
      >
        <div>
          <v-card-title align="left" :class="labelColor(card.selectedStatus)">
            <v-container>
              <v-row>
                <v-col class="py-0" cols="6"> Task {{ card.id }}</v-col>
                <v-col class="py-0" cols="6" align="end">
                  <v-icon
                    class="me-2"
                    size="20"
                    @click="moveTaskForward(card.id)"
                  >
                    mdi-file-move-outline
                  </v-icon>
                  <v-icon class="me-2" size="20" @click="editTask(card.id)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    class="me-2"
                    size="20"
                    @click.prevent="deleteTask(card.id)"
                  >
                    mdi-delete
                  </v-icon>
                </v-col>
              </v-row>
            </v-container></v-card-title
          >
        </div>
        <v-card-text>
          <v-list>
            <kanban-card :card="card"></kanban-card>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <router-link :to="`/${card.id}`">
            <v-btn variant="text" size="small"> VIEW </v-btn></router-link
          >
        </v-card-actions>
      </v-card>
    </template>
    <v-card v-if="!cards.length">
      <v-card-text> No Task Here</v-card-text>
    </v-card>
    <v-dialog v-model="showEditTaskDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <!-- Form fields for task input -->
          <v-text-field
            v-model="targetEditTask.title"
            label="Title"
          ></v-text-field>
          <v-text-field
            v-model="targetEditTask.description"
            label="Description"
          ></v-text-field>
          <v-text-field
            v-model="targetEditTask.comment"
            label="Comments"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <!-- Buttons for Save and Cancel -->
          <v-btn @click.prevent="saveEditedTask">Save</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard.vue";
import { STATUSES, } from "@/constants/index";
import { useStore } from "@/store";
const store = useStore();

export default {
  components: {
    KanbanCard,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    cards() {
      return store.tasks.filter((task) => task.selectedStatus === this.title);
    },
  },
  data() {
    return {
      showEditTaskDialog: false,
      targetEditTask: {
        title: "",
        description: "",
        comment: ""
      },
    };
  },
  methods: {
    deleteTask(taskId) {
      store.deleteTask(taskId);
    },
    editTask(taskId) {
      // Set the task being edited
      this.targetEditTask = this.cards.find((card) => card.id === taskId);
      this.showEditTaskDialog = true;
    },
    saveEditedTask() {
      store.editTask(this.targetEditTask.id, this.targetEditTask);
      this.closeDialog();
    },
    closeDialog() {
      this.targetEditTask = {
        title: "",
        description: "",
        comment: ""
      };
      console.log('targetEditTask: ', this.targetEditTask);
      this.showEditTaskDialog = false;
    },
    labelColor(selectedStatus) {
      if (selectedStatus == STATUSES.PENDING) {
        return "bg-red-lighten-4";
      } else if (selectedStatus == STATUSES.PROCESSING) {
        return "bg-yellow-lighten-4";
      } else if (selectedStatus == STATUSES.DONE) {
        return "bg-green-lighten-4";
      }
    },
    moveTaskForward(id) {
      store.moveTaskForward(id);
    },
    pickupTask(e, moveTaskId) {
      e.dataTransfer.setData("moveTaskId", moveTaskId);
    },
    moveTask(e) {
      const moveTaskId = Number(e.dataTransfer.getData("moveTaskId"));

      let tasks = [...store.tasks];
      const sourceIndex = tasks.findIndex((task) => task.id === moveTaskId);
      tasks[sourceIndex].selectedStatus = this.title;

      store.updateTasks(tasks);
    },
  },
};
</script>
