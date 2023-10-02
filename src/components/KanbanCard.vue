<template>
    <v-list-item>
      <v-list-item-content align="left">
        <h4>Title:</h4>
        <v-list-item-title class="mb-2">{{ card.title }}</v-list-item-title>
        <h4>Description:</h4>
        <v-list-item-subtitle class="mb-3">{{
          card.description
        }}</v-list-item-subtitle>
        <h4>Estimated Date & Time:</h4>
        <v-list-item-title>{{ card.estimatedDate }}</v-list-item-title>
        <v-list-item-title class="mb-2">{{
          card.estimatedTime
        }}</v-list-item-title>
        <h4>Attachments:</h4>
        <v-list-item-title>{{ card.fileInput?.length }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  methods: {
   
  },
};
</script>
