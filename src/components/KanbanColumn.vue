<template>
  <v-flex>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-list v-if="cards.length > 0">
          <kanban-card
            v-for="card in cards"
            :key="card.id"
            :card="card"
          ></kanban-card>
        </v-list>
        <p class="text-md-center" v-if="cards.length == 0"> No Task Here </p>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import KanbanCard from "./KanbanCard.vue";

export default {
  components: {
    KanbanCard,
  },
  props: {
    title: String,
    cards: Array,
  },
  created() {
    console.log("Cards", this.cards);
  },
};
</script>
