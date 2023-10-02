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
        <!-- <draggable> -->
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
        <!-- </draggable> -->
      </v-card>
    </template>
    <v-card v-if="!cards.length">
      <v-card-text> No Task Here</v-card-text>
    </v-card>
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard.vue";
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
  methods: {
    deleteTask(taskId) {
      store.deleteTask(taskId);
    },
    editTask(card) {
      // Set the task being edited
      this.editedTask = { ...card };
    },
    saveEditedTask() {
      // Find the index of the edited task
      const taskIndex = this.cards.findIndex(
        (card) => card.id === this.editedTask.id
      );

      if (taskIndex !== -1) {
        // Update the task in the tasks array
        this.cards.splice(taskIndex, 1, this.editedTask);

        // Clear the editedTask variable
        this.editedTask = null;
      }
    },
    labelColor(selectedStatus) {
      if (selectedStatus == "Pending") {
        return "bg-red-lighten-4";
      } else if (selectedStatus == "Processing") {
        return "bg-yellow-lighten-4";
      } else if (selectedStatus == "Done") {
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
      console.log(store.tasks);
      const sourceIndex = tasks.findIndex((task) => task.id === moveTaskId);
      tasks[sourceIndex].selectedStatus = this.title;

      store.updateTasks(tasks);
    },
  },
};
</script>
