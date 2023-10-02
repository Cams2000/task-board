<template>
  <v-container class="pa-10">
    <v-row>
      <v-col>
        <v-btn @click="goBack()">Back </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-if="targetTask">
          <v-card-title>{{ targetTask.title }}</v-card-title>
          <v-card-text>
            <v-list>
              <kanban-card :card="targetTask"></kanban-card>
            </v-list>
            <v-text-field
              v-model="targetTask.addComment"
              label="Add a Comment"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card v-if="!targetTask">
          <v-card-title>Not Found</v-card-title>
          <v-card-text>No Task here</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KanbanCard from "./KanbanCard.vue";
import { useStore } from "@/store";
const store = useStore();
export default {
  name: "Task",
  components: {
    KanbanCard,
  },
  data() {
    const taskId = this.$route.params.id;
    const targetTask = store.tasks.find((task) => task.id === Number(taskId));
    return {
      targetTask,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
